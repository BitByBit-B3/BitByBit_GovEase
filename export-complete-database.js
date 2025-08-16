// Load environment variables
require('dotenv').config({ path: '.env.local' });

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore');
const fs = require('fs');
const path = require('path');

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Convert Firestore timestamps to regular dates for JSON serialization
function convertTimestamps(obj) {
  if (!obj || typeof obj !== 'object') return obj;
  
  if (obj.toDate && typeof obj.toDate === 'function') {
    return obj.toDate().toISOString();
  }
  
  if (Array.isArray(obj)) {
    return obj.map(convertTimestamps);
  }
  
  const converted = {};
  for (const [key, value] of Object.entries(obj)) {
    converted[key] = convertTimestamps(value);
  }
  return converted;
}

async function exportCompleteDatabase() {
  console.log('🗄️  Starting COMPLETE DATABASE EXPORT...');
  console.log('================================================');
  
  const databaseDump = {
    exportInfo: {
      projectId: firebaseConfig.projectId,
      exportDate: new Date().toISOString(),
      description: 'Complete GovEase Firebase Database Export',
      version: '1.0.0'
    },
    collections: {}
  };

  try {
    // List of all collections to export
    const collectionsToExport = [
      'users',
      'departments', 
      'services',
      'appointments',
      'notifications',
      'feedback',
      'analytics',
      'user_activity',
      'admin_activity',
      'system_alerts'
    ];

    for (const collectionName of collectionsToExport) {
      console.log(`📋 Exporting collection: ${collectionName}...`);
      
      try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        const documents = [];
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          documents.push({
            id: doc.id,
            data: convertTimestamps(data)
          });
        });
        
        databaseDump.collections[collectionName] = {
          count: documents.length,
          documents: documents
        };
        
        console.log(`✅ ${collectionName}: ${documents.length} documents exported`);
      } catch (error) {
        console.log(`⚠️  ${collectionName}: Collection not found or empty`);
        databaseDump.collections[collectionName] = {
          count: 0,
          documents: [],
          error: 'Collection not found or empty'
        };
      }
    }

    // Generate comprehensive stats
    const totalDocuments = Object.values(databaseDump.collections)
      .reduce((sum, collection) => sum + collection.count, 0);

    databaseDump.summary = {
      totalCollections: Object.keys(databaseDump.collections).length,
      totalDocuments: totalDocuments,
      exportedAt: new Date().toISOString(),
      collections: Object.keys(databaseDump.collections).map(name => ({
        name,
        count: databaseDump.collections[name].count
      }))
    };

    // Save to multiple formats
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const exportDir = path.join(__dirname, 'database-exports');
    
    // Create exports directory if it doesn't exist
    if (!fs.existsSync(exportDir)) {
      fs.mkdirSync(exportDir, { recursive: true });
    }

    // 1. Complete JSON dump
    const jsonFile = path.join(exportDir, `govease-complete-db-${timestamp}.json`);
    fs.writeFileSync(jsonFile, JSON.stringify(databaseDump, null, 2));
    console.log(`✅ Complete JSON export: ${jsonFile}`);

    // 2. SQL-like dump for import/restore
    const sqlFile = path.join(exportDir, `govease-db-dump-${timestamp}.sql`);
    let sqlContent = `-- GovEase Database Dump\n`;
    sqlContent += `-- Generated on: ${new Date().toISOString()}\n`;
    sqlContent += `-- Project: ${firebaseConfig.projectId}\n`;
    sqlContent += `-- Total Documents: ${totalDocuments}\n\n`;
    
    for (const [collectionName, collectionData] of Object.entries(databaseDump.collections)) {
      sqlContent += `-- Collection: ${collectionName} (${collectionData.count} documents)\n`;
      sqlContent += `-- DROP COLLECTION ${collectionName};\n`;
      sqlContent += `-- CREATE COLLECTION ${collectionName};\n\n`;
      
      collectionData.documents.forEach((doc, index) => {
        sqlContent += `-- Document ${index + 1}: ${doc.id}\n`;
        sqlContent += `INSERT INTO ${collectionName} (id, data) VALUES (\n`;
        sqlContent += `  '${doc.id}',\n`;
        sqlContent += `  '${JSON.stringify(doc.data).replace(/'/g, "''")}'`;
        sqlContent += `\n);\n\n`;
      });
    }
    
    fs.writeFileSync(sqlFile, sqlContent);
    console.log(`✅ SQL dump export: ${sqlFile}`);

    // 3. CSV exports for each collection
    const csvDir = path.join(exportDir, `csv-exports-${timestamp}`);
    if (!fs.existsSync(csvDir)) {
      fs.mkdirSync(csvDir, { recursive: true });
    }

    for (const [collectionName, collectionData] of Object.entries(databaseDump.collections)) {
      if (collectionData.documents.length > 0) {
        const csvFile = path.join(csvDir, `${collectionName}.csv`);
        let csvContent = '';
        
        // Get all unique keys for headers
        const allKeys = new Set();
        collectionData.documents.forEach(doc => {
          Object.keys(doc.data).forEach(key => allKeys.add(key));
        });
        
        // Headers
        csvContent += `id,${Array.from(allKeys).join(',')}\n`;
        
        // Data rows
        collectionData.documents.forEach(doc => {
          let row = `"${doc.id}"`;
          Array.from(allKeys).forEach(key => {
            const value = doc.data[key];
            const csvValue = typeof value === 'object' ? JSON.stringify(value) : value;
            row += `,"${String(csvValue).replace(/"/g, '""')}"`;
          });
          csvContent += row + '\n';
        });
        
        fs.writeFileSync(csvFile, csvContent);
        console.log(`✅ CSV export: ${csvFile}`);
      }
    }

    // 4. Migration script
    const migrationFile = path.join(exportDir, `restore-govease-db-${timestamp}.js`);
    const migrationScript = `// GovEase Database Restoration Script
// Generated: ${new Date().toISOString()}

const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc, collection } = require('firebase/firestore');

// Your Firebase config
const firebaseConfig = {
  // Add your Firebase configuration here
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const databaseData = ${JSON.stringify(databaseDump, null, 2)};

async function restoreDatabase() {
  console.log('🔄 Starting database restoration...');
  
  for (const [collectionName, collectionData] of Object.entries(databaseData.collections)) {
    console.log(\`📋 Restoring \${collectionName} (\${collectionData.count} documents)...\`);
    
    for (const document of collectionData.documents) {
      try {
        await setDoc(doc(db, collectionName, document.id), document.data);
        console.log(\`✅ Restored \${collectionName}/\${document.id}\`);
      } catch (error) {
        console.error(\`❌ Failed to restore \${collectionName}/\${document.id}:\`, error);
      }
    }
  }
  
  console.log('🎉 Database restoration completed!');
}

// Run restoration
restoreDatabase().catch(console.error);
`;
    
    fs.writeFileSync(migrationFile, migrationScript);
    console.log(`✅ Migration script: ${migrationFile}`);

    // 5. Human-readable report
    const reportFile = path.join(exportDir, `database-report-${timestamp}.md`);
    let reportContent = `# GovEase Database Export Report\n\n`;
    reportContent += `**Export Date:** ${new Date().toLocaleString()}\n`;
    reportContent += `**Project ID:** ${firebaseConfig.projectId}\n`;
    reportContent += `**Total Collections:** ${Object.keys(databaseDump.collections).length}\n`;
    reportContent += `**Total Documents:** ${totalDocuments}\n\n`;
    
    reportContent += `## Collections Overview\n\n`;
    for (const [name, data] of Object.entries(databaseDump.collections)) {
      reportContent += `### ${name}\n`;
      reportContent += `- **Documents:** ${data.count}\n`;
      if (data.documents.length > 0) {
        reportContent += `- **Sample Document ID:** ${data.documents[0].id}\n`;
        const sampleFields = Object.keys(data.documents[0].data).slice(0, 5);
        reportContent += `- **Fields:** ${sampleFields.join(', ')}${sampleFields.length < Object.keys(data.documents[0].data).length ? '...' : ''}\n`;
      }
      reportContent += `\n`;
    }

    reportContent += `## Data Statistics\n\n`;
    reportContent += `- **Users:** ${databaseDump.collections.users?.count || 0}\n`;
    reportContent += `- **Departments:** ${databaseDump.collections.departments?.count || 0}\n`;
    reportContent += `- **Services:** ${databaseDump.collections.services?.count || 0}\n`;
    reportContent += `- **Appointments:** ${databaseDump.collections.appointments?.count || 0}\n`;
    reportContent += `- **Notifications:** ${databaseDump.collections.notifications?.count || 0}\n`;
    reportContent += `- **Feedback:** ${databaseDump.collections.feedback?.count || 0}\n\n`;

    reportContent += `## Files Generated\n\n`;
    reportContent += `1. **Complete JSON:** \`govease-complete-db-${timestamp}.json\`\n`;
    reportContent += `2. **SQL Dump:** \`govease-db-dump-${timestamp}.sql\`\n`;
    reportContent += `3. **CSV Files:** \`csv-exports-${timestamp}/\`\n`;
    reportContent += `4. **Migration Script:** \`restore-govease-db-${timestamp}.js\`\n`;
    reportContent += `5. **This Report:** \`database-report-${timestamp}.md\`\n\n`;

    fs.writeFileSync(reportFile, reportContent);
    console.log(`✅ Database report: ${reportFile}`);

    console.log('\n🎉 COMPLETE DATABASE EXPORT FINISHED!');
    console.log('================================================');
    console.log(`📁 Export Directory: ${exportDir}`);
    console.log(`📊 Total Collections: ${Object.keys(databaseDump.collections).length}`);
    console.log(`📄 Total Documents: ${totalDocuments}`);
    console.log('================================================');
    console.log('📋 Files Created:');
    console.log(`   - Complete JSON backup`);
    console.log(`   - SQL dump for restoration`);
    console.log(`   - CSV files for each collection`);
    console.log(`   - Migration script for easy restore`);
    console.log(`   - Human-readable report`);
    console.log('================================================');
    console.log('🚀 Your complete database is now backed up!');

    return {
      success: true,
      exportPath: exportDir,
      totalDocuments,
      collections: Object.keys(databaseDump.collections).length
    };

  } catch (error) {
    console.error('❌ Error during database export:', error);
    return { success: false, error: error.message };
  }
}

// Run the export
exportCompleteDatabase();
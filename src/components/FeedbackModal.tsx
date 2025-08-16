'use client';

import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { 
  StarIcon,
  XMarkIcon,
  FaceSmileIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

const feedbackSchema = z.object({
  rating: z.number().min(1, 'Please provide a rating').max(5),
  experience: z.string().min(1, 'Please describe your experience'),
  suggestions: z.string().optional(),
  wouldRecommend: z.boolean(),
});

type FeedbackFormData = z.infer<typeof feedbackSchema>;

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointmentId: string;
  serviceName: string;
  departmentName: string;
}

export default function FeedbackModal({ 
  isOpen, 
  onClose, 
  appointmentId, 
  serviceName, 
  departmentName 
}: FeedbackModalProps) {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      wouldRecommend: true,
    }
  });

  const onSubmit = async (data: FeedbackFormData) => {
    if (!user) return;

    setSubmitting(true);
    try {
      await addDoc(collection(db, 'feedback'), {
        userId: user.id,
        appointmentId,
        serviceName,
        departmentName,
        rating: data.rating,
        experience: data.experience,
        suggestions: data.suggestions || '',
        wouldRecommend: data.wouldRecommend,
        createdAt: new Date(),
        status: 'active',
      });

      toast.success('🎉 Thank you for your feedback! Your input helps us improve our services.');
      form.reset();
      setRating(0);
      onClose();
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error('Failed to submit feedback. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleRatingClick = (newRating: number) => {
    setRating(newRating);
    form.setValue('rating', newRating);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in-up">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative p-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-2xl">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
          
          <div className="flex items-center mb-4">
            <div className="feature-icon mr-4">
              <FaceSmileIcon className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-2">Share Your Experience</h2>
              <p className="text-blue-100">
                Help us improve government services for everyone
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Service Info */}
          <div className="bg-blue-50 rounded-xl p-6 mb-8">
            <h3 className="font-bold text-heading mb-2">Service Details</h3>
            <div className="space-y-1 text-body">
              <p><span className="font-semibold">Service:</span> {serviceName}</p>
              <p><span className="font-semibold">Department:</span> {departmentName}</p>
            </div>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Rating */}
            <div>
              <label className="block text-lg font-bold text-heading mb-4">
                How would you rate your overall experience?
              </label>
              <div className="flex items-center space-x-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingClick(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 transition-transform hover:scale-110 focus:outline-none"
                  >
                    {star <= (hoverRating || rating) ? (
                      <StarIconSolid className="h-8 w-8 text-yellow-400" />
                    ) : (
                      <StarIcon className="h-8 w-8 text-gray-300" />
                    )}
                  </button>
                ))}
              </div>
              <div className="text-sm text-caption">
                {rating === 0 && "Click to rate your experience"}
                {rating === 1 && "😞 Poor - We need to do better"}
                {rating === 2 && "😐 Fair - Room for improvement"}
                {rating === 3 && "🙂 Good - Decent service"}
                {rating === 4 && "😊 Very Good - Great experience"}
                {rating === 5 && "🌟 Excellent - Outstanding service!"}
              </div>
              {form.formState.errors.rating && (
                <p className="mt-2 text-sm text-red-600 font-medium">
                  {form.formState.errors.rating.message}
                </p>
              )}
            </div>

            {/* Experience Description */}
            <div>
              <label className="block text-lg font-bold text-heading mb-4">
                Tell us about your experience
              </label>
              <textarea
                {...form.register('experience')}
                rows={4}
                className="input-field w-full"
                placeholder="What went well? What could be improved? How did our staff perform? Please share the details of your visit..."
              />
              {form.formState.errors.experience && (
                <p className="mt-2 text-sm text-red-600 font-medium">
                  {form.formState.errors.experience.message}
                </p>
              )}
            </div>

            {/* Suggestions */}
            <div>
              <label className="block text-lg font-bold text-heading mb-4">
                Suggestions for improvement (optional)
              </label>
              <textarea
                {...form.register('suggestions')}
                rows={3}
                className="input-field w-full"
                placeholder="Any suggestions for making our services better? Ideas for reducing wait times, improving processes, or enhancing user experience..."
              />
            </div>

            {/* Recommendation */}
            <div className="bg-green-50 rounded-xl p-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...form.register('wouldRecommend')}
                  className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label className="ml-3 text-lg font-bold text-heading">
                  I would recommend this service to other citizens
                </label>
              </div>
              <p className="mt-2 text-body text-sm">
                Help other citizens discover quality government services
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex space-x-4 pt-6 border-t border-gray-100">
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary flex-1"
                disabled={submitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting || rating === 0}
                className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting Feedback...
                  </>
                ) : (
                  <>
                    <CheckCircleIcon className="h-5 w-5 mr-2" />
                    Submit Feedback
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
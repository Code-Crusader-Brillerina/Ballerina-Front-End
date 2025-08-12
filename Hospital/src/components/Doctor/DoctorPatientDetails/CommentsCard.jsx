import React from "react";

const CommentsCard = ({ comment, setComment, onAddComment }) => (
  <div className="bg-gradient-to-r from-white to-purple-50 rounded-2xl shadow-xl p-6 border border-purple-100">
    <div className="flex items-center mb-4">
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-2 rounded-lg mr-3 text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-800">Doctor's Comments</h3>
    </div>

    <textarea
      value={comment}
      onChange={(e) => setComment(e.target.value)}
      placeholder="Add a comment..."
      className="w-full p-3 rounded-lg border border-purple-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-300 resize-y min-h-[80px]"
    />

    <button
      onClick={onAddComment}
      className="mt-3 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium w-full transition"
    >
      Add Comment
    </button>
  </div>
);

export default CommentsCard;

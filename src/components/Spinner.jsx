import React from "react";

export default function SpinnerComponent() {
  return (
    <div className="container mx-auto text-center py-4 my-4">
      <div class="spinner-border text-danger" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

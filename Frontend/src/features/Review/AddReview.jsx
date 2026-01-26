import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateReviewForm from "./CreateReviewForm";

function AddReview() {
  return (
    <Modal>
      <Modal.Open opens="add-review">
        <Button
          size="lg"
          variant="back"
          //onClick={handleReviewForm} we have to open modal so we will pass onClick from Modal.jsx
          className="inline-flex items-center justify-center rounded-xl border border-gray-200 text-sm font-medium backdrop-blur transition-all focus:outline-none disabled:pointer-events-none disabled:opacity-50"
        >
          Write a Review
        </Button>
      </Modal.Open>
      <Modal.Window name="add-review">
        <CreateReviewForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddReview;

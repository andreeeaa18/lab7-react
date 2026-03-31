import {
  useFormState,
  useFormDispatch,
  actionTypes,
} from "../context/FormContext";

function Step4Review() {
  const state = useFormState();
  const dispatch = useFormDispatch();
  const { fields, submitted } = state;

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: actionTypes.SUBMIT });
  }

  if (submitted) {
    return (
      <div className="bakery-review-success">
        <h2 className="bakery-review-title">Thank you for your order!</h2>
        <p>Your order has been received and we will contact you soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bakery-review-form">
      <h2 className="bakery-review-title">Review Your Order</h2>
      <section className="bakery-review-section">
        <strong>Product:</strong>{" "}
        {fields.productCategory === "offmenu"
          ? "Off-menu custom order"
          : fields.product || "—"}
      </section>
      {fields.productCategory === "offmenu" && (
        <section className="bakery-review-section">
          <strong>Custom Order:</strong> {fields.customOrder || "—"}
          <br />
          <strong>Options:</strong>{" "}
          {fields.customOptions && fields.customOptions.length
            ? fields.customOptions.join(", ")
            : "—"}
          {fields.customPickupTime && (
            <>
              <br />
              <strong>Pick-up time:</strong> {fields.customPickupTime}
            </>
          )}
        </section>
      )}
      {fields.productCategory !== "offmenu" && (
        <>
          <section className="bakery-review-section">
            <strong>Quantity:</strong> {fields.quantity}
          </section>
          {fields.sweetness && (
            <section className="bakery-review-section">
              <strong>Sweetness:</strong> {fields.sweetness}
            </section>
          )}
          {fields.servingTemp && (
            <section className="bakery-review-section">
              <strong>Serving temperature:</strong> {fields.servingTemp}
            </section>
          )}
          {fields.extraTopping && (
            <section className="bakery-review-section">
              <strong>Extra topping:</strong> {fields.extraTopping}
            </section>
          )}
          <section className="bakery-review-section">
            <strong>Packing:</strong>{" "}
            {fields.packaging === "beautiful"
              ? "Beautifully packed"
              : "Simple packed"}
          </section>
          <section className="bakery-review-section">
            <strong>Message for bakery:</strong> {fields.bakeryMessage || "—"}
          </section>
        </>
      )}
      <section className="bakery-review-section">
        <strong>Name:</strong> {fields.name || "—"}
        <br />
        <strong>Phone:</strong> {fields.phone || "—"}
        <br />
        <strong>Address:</strong> {fields.address || "—"}
      </section>
      <section className="bakery-review-section">
        <strong>Delivery:</strong> {fields.deliveryType || "—"}
        <br />
        <strong>Date:</strong> {fields.deliveryDate || "—"}
      </section>
      <section className="bakery-review-section">
        <strong>Notes:</strong> {fields.notes || "—"}
      </section>
      <button type="submit" className="bakery-submit-btn">
        Submit Order
      </button>
    </form>
  );
}

export default Step4Review;

import React from "react";
import { useFormState } from "../context/FormContext";

function LivePreview() {
  const state = useFormState();
  const { fields } = state;

  return (
    <aside className="bakery-preview">
      <h3 className="bakery-preview-title">Live Order Preview</h3>

      <div className="bakery-preview-section">
        <div className="bakery-preview-label">Product</div>
        <div className="bakery-preview-value">
          {fields.productCategory === "offmenu"
            ? "Off-menu custom order"
            : fields.product || "—"}
        </div>
      </div>

      {fields.productCategory === "offmenu" && (
        <>
          <div className="bakery-preview-section">
            <div className="bakery-preview-label">Description</div>
            <div className="bakery-preview-value">
              {fields.customOrder || "—"}
            </div>
          </div>
          {fields.customFlavors && fields.customFlavors.length > 0 && (
            <div className="bakery-preview-section">
              <div className="bakery-preview-label">Flavours</div>
              <div className="bakery-preview-value">
                {fields.customFlavors.join(", ")}
              </div>
            </div>
          )}
          {fields.customOptions && fields.customOptions.length > 0 && (
            <div className="bakery-preview-section">
              <div className="bakery-preview-label">Dietary</div>
              <div className="bakery-preview-value">
                {fields.customOptions.join(", ")}
              </div>
            </div>
          )}
          {fields.customPickupTime && (
            <div className="bakery-preview-section">
              <div className="bakery-preview-label">Pick-up time</div>
              <div className="bakery-preview-value">
                {fields.customPickupTime}
              </div>
            </div>
          )}
        </>
      )}

      {fields.productCategory !== "offmenu" &&
        fields.productCategory !== "" && (
          <>
            <div className="bakery-preview-section">
              <div className="bakery-preview-label">Quantity</div>
              <div className="bakery-preview-value">{fields.quantity}</div>
            </div>
            {fields.sweetness && (
              <div className="bakery-preview-section">
                <div className="bakery-preview-label">Sweetness</div>
                <div className="bakery-preview-value">{fields.sweetness}</div>
              </div>
            )}
            {fields.servingTemp && (
              <div className="bakery-preview-section">
                <div className="bakery-preview-label">Serving temp</div>
                <div className="bakery-preview-value">{fields.servingTemp}</div>
              </div>
            )}
            {fields.extraTopping && (
              <div className="bakery-preview-section">
                <div className="bakery-preview-label">Topping</div>
                <div className="bakery-preview-value">
                  {fields.extraTopping}
                </div>
              </div>
            )}
            <div className="bakery-preview-section">
              <div className="bakery-preview-label">Packing</div>
              <div className="bakery-preview-value">
                {fields.packaging === "beautiful"
                  ? "Beautifully packed"
                  : "Simple packed"}
              </div>
            </div>
            {fields.bakeryMessage && (
              <div className="bakery-preview-section">
                <div className="bakery-preview-label">Bakery note</div>
                <div className="bakery-preview-value">
                  {fields.bakeryMessage}
                </div>
              </div>
            )}
          </>
        )}

      <div className="bakery-preview-divider" />

      <div className="bakery-preview-section">
        <div className="bakery-preview-label">Name</div>
        <div className="bakery-preview-value">{fields.name || "—"}</div>
      </div>
      <div className="bakery-preview-section">
        <div className="bakery-preview-label">Phone</div>
        <div className="bakery-preview-value">{fields.phone || "—"}</div>
      </div>
      <div className="bakery-preview-section">
        <div className="bakery-preview-label">Address</div>
        <div className="bakery-preview-value">{fields.address || "—"}</div>
      </div>
      <div className="bakery-preview-section">
        <div className="bakery-preview-label">Delivery</div>
        <div className="bakery-preview-value">
          {fields.deliveryType
            ? fields.deliveryType === "pickup"
              ? "Pickup from bakery"
              : "Delivery"
            : "—"}
        </div>
      </div>
      <div className="bakery-preview-section">
        <div className="bakery-preview-label">Date</div>
        <div className="bakery-preview-value">{fields.deliveryDate || "—"}</div>
      </div>
      {fields.notes && (
        <div className="bakery-preview-section">
          <div className="bakery-preview-label">Notes</div>
          <div className="bakery-preview-value">{fields.notes}</div>
        </div>
      )}
    </aside>
  );
}

export default LivePreview;

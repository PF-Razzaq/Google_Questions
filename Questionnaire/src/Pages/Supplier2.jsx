import React from "react";

const Supplier2 = () => {
  return (
    <div>
      {/* Question 121 */}
      <div className="field-sections">
        <span>
          Q.{supplierJson.find((f) => f.id === "121").id}:&nbsp;&nbsp;
        </span>
        <span>{supplierJson.find((f) => f.id === "121").q}</span>
        <br />
        <br />
        <label>
          <input
            name="Qs121_ConfirmCompActsWithStockholmConvention"
            type="radio"
            value="yes"
            checked={
              supplierData.Qs121_ConfirmCompActsWithStockholmConvention ===
              "yes"
            }
            onChange={handleChange}
          />
          Yes
        </label>

        <label style={{ marginLeft: "1rem" }}>
          <input
            type="radio"
            value="no"
            name="Qs121_ConfirmCompActsWithStockholmConvention"
            checked={
              supplierData.Qs121_ConfirmCompActsWithStockholmConvention === "no"
            }
            onChange={handleChange}
          />
          No
        </label>
      </div>
    </div>
  );
};

export default Supplier2;

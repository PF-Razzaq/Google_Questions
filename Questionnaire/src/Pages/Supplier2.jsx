import React from "react";

const Supplier2 = () => {
  return (
    <div>
      {/* Question 1 */}
      <div className="field-sections">
        <span>Q.{supplierJson.find((f) => f.id === "1").id}:&nbsp;&nbsp;</span>
        <span>
          {supplierJson.find((f) => f.id === "1").q}{" "}
          <span style={{ color: "red" }}>*</span>
        </span>
        <input
          onChange={handleChange}
          placeholder="Enter your answer"
          type="text"
          name="Qs1_SupplierName" // Add name attribute
          className="mt-3 outline-none w-100"
          id="name-text"
          required
        />
      </div>
      {/* Question 2 */}
      <div className="field-sections">
        <span>Q.{supplierJson.find((f) => f.id === "2").id}:&nbsp;&nbsp;</span>
        <span>
          {supplierJson.find((f) => f.id === "2").q}
          <span style={{ color: "red" }}>*</span>
        </span>
        <input
          onChange={handleChange}
          placeholder="Enter your answer"
          type="number"
          onInput={(e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-digit characters
          }}
          // pattern="[0-9]*"
          name="Qs2_SuppBusinessLicenseNumber" // Add name attribute
          className="mt-3 outline-none w-100"
          id="name-text"
          required
        />
      </div>
      {/* Question 3 */}
      <div className="field-sections">
        <span>Q.{supplierJson.find((f) => f.id === "3").id}:&nbsp;&nbsp;</span>
        <span>
          {supplierJson.find((f) => f.id === "3").q}{" "}
          <span style={{ color: "red" }}>*</span>
        </span>
        <input
          onChange={handleChange}
          placeholder="Enter your answer"
          type="number"
          onInput={(e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-digit characters
          }}
          pattern="[0-9]*"
          name="Qs3_SuppExportLicenseNumber" // Add name attribute
          className="mt-3 outline-none w-100"
          id="name-text"
          required
        />
      </div>
      {/* Question 4 */}
      <div className="field-sections">
        <span>Q.{supplierJson.find((f) => f.id === "4").id}:&nbsp;&nbsp;</span>
        <span>
          {supplierJson.find((f) => f.id === "4").q}{" "}
          <span style={{ color: "red" }}>*</span>
        </span>
        <input
          onChange={handleChange}
          placeholder="Enter your answer"
          type="number"
          onInput={(e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-digit characters
          }}
          pattern="[0-9]*"
          name="Qs4_SuppVATNumber" // Add name attribute
          className="mt-3 outline-none w-100"
          id="name-text"
          required
        />
      </div>
      <h4 className="supplier-heading">Supplier Address</h4>
      {/* Question  5*/}
      <div className="field-sections">
        <span>Q.5:&nbsp;&nbsp;</span>
        <span>
          {supplierJson.find((f) => f.id === "5a").q}{" "}
          <span style={{ color: "red" }}>*</span>
        </span>
        <input
          onChange={handleChange}
          placeholder="Enter your answer"
          type="text"
          name="Qs5a_Building" // Add name attribute
          className="mt-3 outline-none w-100"
          id="name-text"
          required
        />
      </div>
      <div className="field-sections">
        <span>
          {supplierJson.find((f) => f.id === "5b").q}{" "}
          <span style={{ color: "red" }}>*</span>
        </span>
        <input
          onChange={handleChange}
          placeholder="Enter your answer"
          type="text"
          name="Qs5b_Street" // Add name attribute
          className="mt-3 outline-none w-100"
          id="name-text"
          required
        />
      </div>
      {/* Question  6*/}
      <div className="field-sections">
        <span>Q.6:&nbsp;&nbsp;</span>
        <span>
          Town <span style={{ color: "red" }}>*</span>
        </span>
        <input
          onChange={handleChange}
          placeholder="Enter your answer"
          type="text"
          name="Qs6a_Town" // Add name attribute
          className="mt-3 outline-none w-100"
          id="name-text"
          required
        />
      </div>
      <div className="field-sections">
        <span>
          City <span style={{ color: "red" }}>*</span>
        </span>
        <input
          onChange={handleChange}
          placeholder="Enter your answer"
          type="text"
          name="Qs6b_City" // Add name attribute
          className="mt-3 outline-none w-100"
          id="name-text"
          required
        />
      </div>
      <div className="field-sections">
        <span>
          Province <span style={{ color: "red" }}>*</span>
        </span>
        <input
          onChange={handleChange}
          placeholder="Enter your answer"
          type="text"
          name="Qs6c_Province" // Add name attribute
          className="mt-3 outline-none w-100"
          id="name-text"
          required
        />
      </div>
      {/* Question  7*/}
      <div className="field-sections">
        <span>Q.7:&nbsp;&nbsp;</span>
        <span>Post Code</span>

        <input
          onChange={handleChange}
          placeholder="Enter your answer"
          type="text"
          name="Qs7_PostCode" // Add name attribute
          className="mt-3 outline-none w-100"
          id="name-text"
        />
      </div>
      {/* Question  8*/}
      <div className="field-sections">
        <span>Q.8:&nbsp;&nbsp;</span>
        <span>Country</span>
        <select
          value={supplierData.Qs8_Country}
          onChange={(e) => {
            setSupplierData({
              ...supplierData,
              Qs8_Country: e.target.value,
              q8Other: e.target.value,
            });
          }}
          className="form-select"
          aria-label="Default select example"
          name="Qs8_Country"
        >
          <option disabled selected>
            Choose Country
          </option>
          <option value="china">China</option>
          <option value="germany">Germany</option>
          <option value="hongkong">Hong Kong</option>
          <option value="india">India</option>
          <option value="taiwan">Taiwan</option>
          <option value="vietnam">Vietnam</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
          <option value="other">Other</option>
        </select>
        {supplierData.q8Other === "other" && (
          <div className="input-group w-25 mt-2">
            <input
              onChange={(e) => {
                setSupplierData({
                  ...supplierData,
                  Qs8_Country: e.target.value,
                });
              }}
              type="text"
              className="form-control w-25 rounded"
              placeholder="Enter Custom Option"
              aria-label="Enter text..."
              aria-describedby="basic-addon2"
            />
            <div className="input-group-append">
              <button
                className="btn btn-primary ms-2"
                type="button"
                onClick={() => {
                  if (supplierData.Qs8_Country.toLowerCase() !== "other") {
                    setOptions([supplierData.Qs8_Country]);
                  }
                }}
              >
                Add Country
              </button>
            </div>
          </div>
        )}
      </div>
      <h4 className="supplier-heading">Supplier Contact Details</h4>
      {/* Question  9*/}
      <div className="field-sections">
        <span>Q.9:&nbsp;&nbsp;</span>
        <span>
          Phone <span style={{ color: "red" }}>*</span>
        </span>
        <div className="form-group d-flex">
          <select className="form-control countryCode me-1" id="countrySelect">
            {countryCode.map((country) => (
              <option key={country.code} value={country.dial_code}>
                {country.dial_code + "    " + " "} &nbsp; &nbsp;&nbsp;
                &nbsp;&nbsp; &nbsp;
                {" " + country.name}
              </option>
            ))}
          </select>
          -
          <input
            name="Qs9a_Phone"
            type="number"
            onInput={(e) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-digit characters
            }}
            pattern="[0-9]*"
            onChange={handleChange}
            class="form-control ms-1 phoneNumberInput"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            required
          ></input>
        </div>
      </div>
      <div className="field-sections">
        <span>
          Cell Phone <span style={{ color: "red" }}>*</span>
        </span>
        <div className="form-group d-flex">
          <select className="form-control countryCode me-1" id="countrySelect">
            {countryCode.map((country) => (
              <option key={country.code} value={country.dial_code}>
                {country.dial_code + "    " + "   "}&nbsp; &nbsp;&nbsp;
                &nbsp;&nbsp; &nbsp;
                {" " + country.name}
              </option>
            ))}
          </select>
          -
          <input
            type="number"
            onInput={(e) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-digit characters
            }}
            pattern="[0-9]*"
            name="Qs9b_Cellphone"
            onChange={handleChange}
            class="form-control ms-1 phoneNumberInput"
            id="exampleInputEmail2"
            aria-describedby="emailHelp"
            required
          ></input>
        </div>
      </div>
      {/* Question  10*/}
      <div className="field-sections">
        <span>Q.10:&nbsp;&nbsp;</span>
        <span>
          Email <span style={{ color: "red" }}>*</span>
        </span>
        <input
          onChange={handleChange}
          placeholder="Enter your answer"
          type="email"
          name="Qs10_Email" // Add name attribute
          className="mt-3 outline-none w-100"
          id="name-text"
          required
        />
      </div>
      {/* Question  11*/}
      <div className="field-sections">
        <span>Q.11:&nbsp;&nbsp;</span>
        <span>Website</span>
        <input
          onChange={handleChange}
          placeholder="Enter your answer"
          type="text"
          name="Qs11_Website" // Add name attribute
          className="mt-3 outline-none w-100"
          id="name-text"
        />
      </div>
      <h3 className="supplier-heading">Contact Person</h3>
      {/* Question  12*/}
      <div>
        <select
          className="form-select"
          aria-label="Default select example"
          onChange={(e) => {
            setSupplierData({
              ...supplierData,
              Qs12a_salutation: e.target.value,
            });
          }}
          name="Qs12a_salutation"
        >
          <option disabled selected>
            Salutation
          </option>
          <option value="mr">Mr.</option>
          <option value="ms">Ms.</option>
        </select>
      </div>
      <div className="field-sections">
        <span>
          First Name <span style={{ color: "red" }}>*</span>
        </span>
        <input
          onChange={handleChange}
          placeholder="Enter your answer"
          type="text"
          name="Qs12b_FirstName" // Add name attribute
          className="mt-3 outline-none w-100"
          id="name-text"
          required
        />
      </div>
      <div className="field-sections">
        <span>
          Last Name <span style={{ color: "red" }}>*</span>
        </span>
        <input
          onChange={handleChange}
          placeholder="Enter your answer"
          type="text"
          name="Qs12c_LastName" // Add name attribute
          className="mt-3 outline-none w-100"
          id="name-text"
          required
        />
      </div>
      {/* Question  13*/}
      <div className="field-sections">
        <span>Q.13:&nbsp;&nbsp;</span>
        <span>
          Contact Person Position <span style={{ color: "red" }}>*</span>
        </span>
        <input
          onChange={handleChange}
          placeholder="Enter your answer"
          type="text"
          name="Qs13_ContactPersonPosition" // Add name attribute
          className="mt-3 outline-none w-100"
          id="name-text"
          required
        />
      </div>
      <h3 className="supplier-heading">Supplier Information</h3>
      {/* Question  14*/}
      <div className="field-sections">
        <span>Q.14:&nbsp;&nbsp;</span>
        <span>
          Year of Establishment <span style={{ color: "red" }}>*</span>
        </span>
        <input
          onChange={handleChange}
          placeholder="This value must be a number"
          type="text"
          name="Qs14_YearOfEstablishment" // Add name attribute
          className="mt-3 outline-none w-100"
          id="name-text"
          maxLength={4}
          minLength={4}
          required
          onInput={(e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-digit characters
          }}
        />
      </div>
      {/* Question  15*/}
      <div className="field-sections">
        <span>Q.15:&nbsp;&nbsp;</span>
        <span>
          Total Number of Employees <span style={{ color: "red" }}>*</span>
        </span>
        <input
          onChange={handleChange}
          placeholder="This value must be a number"
          onInput={(e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-digit characters
          }}
          pattern="[0-9]*"
          name="Qs15_TotalNoOfEmployees" // Add name attribute
          className="mt-3 outline-none w-100"
          id="name-text"
          required
        />
      </div>
      {/* Question  16*/}
      <div className="field-sections">
        <span>Q.16:&nbsp;&nbsp;</span>
        <span>Ownership</span>
        <select
          value={supplierData.Qs16_Ownership}
          onChange={(e) => {
            setSupplierData({
              ...supplierData,
              Qs16_Ownership: e.target.value,
              Q16Other: e.target.value,
            });
          }}
          className="form-select"
          aria-label="Default select example"
          name="Qs16_Ownership"
          required
        >
          <option disabled selected>
            Ownership
          </option>
          <option value="private">Private</option>
          <option value="public">Public</option>
          <option value="state">State</option>
          <option value="jointVenture">Joint Venture</option>
          <option value="belongsToGroup">Belongs to Group </option>
          {ownerships.map((ownership) => (
            <option key={ownership} value={ownership}>
              {ownership}
            </option>
          ))}
          <option value="other">Other</option>
        </select>
        {supplierData.Q16Other === "other" && (
          <div className="input-group w-25 mt-2">
            <input
              onChange={(e) => {
                setSupplierData({
                  ...supplierData,
                  Qs16_Ownership: e.target.value,
                });
              }}
              type="text"
              className="form-control w-25 rounded"
              placeholder="Enter Custom Option"
              aria-label="Enter text..."
              aria-describedby="basic-addon2"
              name="Qs16_Ownership"
              required
            />
            <div className="input-group-append">
              <button
                className="btn btn-primary ms-2"
                type="button"
                onClick={() => {
                  if (supplierData.Qs16_Ownership.toLowerCase() !== "other") {
                    setOwnerships([supplierData.Qs16_Ownership]);
                  }
                }}
              >
                Add Country
              </button>
            </div>
          </div>
        )}
      </div>
      {/* Question  17*/}
      <div className="field-sections">
        <span>Q.17:&nbsp;&nbsp;</span>
        <span>Business Category</span>
        <select
          value={supplierData.Qs17_BusinessCategory}
          onChange={(e) => {
            setSupplierData({
              ...supplierData,
              Qs17_BusinessCategory: e.target.value,
            });
          }}
          className="form-select"
          aria-label="Default select example"
          name="Qs17_BusinessCategory"
        >
          <option disabled selected>
            Business Category
          </option>
          <option value="trader">Trader</option>
          <option value="manufacturerTrader">Manufacturer / Trader</option>
        </select>
      </div>
      {/* Question  18*/}
      <div className="field-sections">
        <span>Q.18:&nbsp;&nbsp;</span>
        <span>
          Main Products(Please separate by "/" incl. space, e.g., product 1 /
          product 2) <span style={{ color: "red" }}>*</span>
        </span>
        <input
          onChange={handleChange}
          placeholder="Enter your answer"
          type="text"
          name="Qs18_MainProducts" // Add name attribute
          className="mt-3 outline-none w-100"
          id="name-text"
          required
        />
      </div>
      {/* Question  19*/}
      <div className="field-sections">
        <span>Q.19:&nbsp;&nbsp;</span>
        <span>
          Sales per Year / Domestic / (Mio USD){" "}
          <span style={{ color: "red" }}>*</span>
        </span>
        <input
          onChange={handleChange}
          placeholder="This value must be a number"
          type="number"
          onInput={(e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-digit characters
          }}
          pattern="[0-9]*"
          name="Qs19_SalesPerYearDomestic" // Add name attribute
          className="mt-3 outline-none w-100"
          id="name-text"
          required
        />
      </div>
      {/* Question  20*/}
      <div className="field-sections">
        <span>Q.20:&nbsp;&nbsp;</span>
        <span>
          Sales per Year / Export / (Mio USD)
          <span style={{ color: "red" }}>*</span>
        </span>
        <input
          onChange={handleChange}
          placeholder="This value must be a number"
          type="number"
          onInput={(e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-digit characters
          }}
          pattern="[0-9]*"
          name="Qs20_SalesPerYearExport" // Add name attribute
          className="mt-3 outline-none w-100"
          id="name-text"
          required
        />
      </div>
      {/* Question  21*/}
      <div className="field-sections">
        <span>Q.21:&nbsp;&nbsp;</span>
        <span>
          Main Customers and Country(Please separate by "/" incl. space, e.g.,
          Company 1 - Country 1 / Company 2 - Country 2)
          <span style={{ color: "red" }}>*</span>
        </span>
        <input
          onChange={handleChange}
          placeholder="Enter your answer"
          type="text"
          name="Qs21_MainCustomerAndCountry" // Add name attribute
          className="mt-3 outline-none w-100"
          id="name-text"
          required
        />
      </div>
      {/* Question  22*/}
      <div className="field-sections">
        <span>Q.22:&nbsp;&nbsp;</span>
        <span>
          Main Customer Products(Please separate by "/" incl. space, e.g.,
          product 1 / product 2)
          <span style={{ color: "red" }}>*</span>
        </span>
        <input
          onChange={handleChange}
          placeholder="Enter your answer"
          type="text"
          name="Qs22_MainCustomerProducts" // Add name attribute
          className="mt-3 outline-none w-100"
          id="name-text"
          required
        />
      </div>
      {/* Question  23*/}
      <div className="field-sections">
        <span>Q.23:&nbsp;&nbsp;</span>
        <span>Main Export Markets</span>
        <span style={{ color: "red" }}>*</span>

        <select
          value={supplierData.Qs23_MainExportMarkets}
          onChange={(e) => {
            setSupplierData({
              ...supplierData,
              Qs23_MainExportMarkets: e.target.value,
              Q23Other: e.target.value,
            });
          }}
          className="form-select"
          aria-label="Default select example"
          name="Qs23_MainExportMarkets"
          required
        >
          <option disabled selected>
            Main Export Markets
          </option>
          <option value="westernEurope">Western Europe</option>
          <option value="easternEurope">Eastern Europe</option>
          <option value="northAmerica">North America</option>
          <option value="southAmerica">South America</option>
          <option value="asiaPacific">Asia Pacific</option>
          <option value="africa">Africa </option>
          <option value="middleEast">Middle East</option>
          <option value="worldwide">Worldwide</option>
          {exports.map((exp) => (
            <option key={exp} value={exp}>
              {exp}
            </option>
          ))}
          <option value="other">Other</option>
        </select>
        {supplierData.Q23Other === "other" && (
          <div className="input-group w-25 mt-2">
            <input
              onChange={(e) => {
                setSupplierData({
                  ...supplierData,
                  Qs23_MainExportMarkets: e.target.value,
                });
              }}
              type="text"
              className="form-control w-25 rounded"
              placeholder="Enter Custom Option"
              aria-label="Enter text..."
              aria-describedby="basic-addon2"
              name="Qs23_MainExportMarkets"
              required
            />
            <div className="input-group-append">
              <button
                className="btn btn-primary ms-2"
                type="button"
                onClick={() => {
                  if (
                    supplierData.Qs23_MainExportMarkets.toLowerCase() !==
                    "other"
                  ) {
                    setExports([supplierData.Qs23_MainExportMarkets]);
                  }
                }}
              >
                Add Country
              </button>
            </div>
          </div>
        )}
      </div>
      {/* Question 24 */}
      <div className="field-sections">
        <span>Q.24:&nbsp;&nbsp;</span>
        <span>Trade Fair</span>
        <span style={{ color: "red" }}>*</span>
        <br />
        <br />
        <label>
          <input
            name="Qs24_TradeFair"
            type="radio"
            value="yes"
            checked={supplierData.Qs24_TradeFair === "yes"}
            onChange={handleChange}
            required
          />
          Yes
        </label>

        <label style={{ marginLeft: "1rem" }}>
          <input
            type="radio"
            value="no"
            name="Qs24_TradeFair"
            checked={supplierData.Qs24_TradeFair === "no"}
            onChange={handleChange}
            required
          />
          No
        </label>
      </div>
      {/* Question  25*/}
      <div className="field-sections">
        <span>Q.25:&nbsp;&nbsp;</span>
        <span>
          Trade Fair Participation(Please separate by "/" incl. space, e.g.,
          Trade Fair 1 / Trade Fair 2)
        </span>
        <input
          onChange={handleChange}
          placeholder="Enter your answer"
          type="text"
          name="Qs25_TradeFairParticipation" // Add name attribute
          className="mt-3 outline-none w-100"
          id="name-text"
        />
      </div>
      {/* Question  26*/}
      <div className="field-sections">
        <span>Q.26:&nbsp;&nbsp;</span>
        <span>
          Show Room <span style={{ color: "red" }}>*</span>
        </span>
        <br />
        <br />
        <label>
          <input
            name="Qs26_ShowRoom"
            type="radio"
            value="yes"
            checked={supplierData.Qs26_ShowRoom === "yes"}
            onChange={handleChange}
            required
          />
          Yes
        </label>

        <label style={{ marginLeft: "1rem" }}>
          <input
            type="radio"
            value="no"
            name="Qs26_ShowRoom"
            checked={supplierData.Qs26_ShowRoom === "no"}
            onChange={handleChange}
            required
          />
          No
        </label>
      </div>
      {/* Question  27*/}
      <div className="field-sections">
        <span>Q.27:&nbsp;&nbsp;</span>
        <span>
          Delivery lead time for initial order (in working days){" "}
          <span style={{ color: "red" }}>*</span>
        </span>
        <input
          onChange={handleChange}
          placeholder="This value must be a number"
          type="number"
          onInput={(e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-digit characters
          }}
          pattern="[0-9]*"
          name="Qs27_DeliveryLeadTimeInitialOrder" // Add name attribute
          className="mt-3 outline-none w-100"
          id="name-text"
          required
        />
      </div>
      {/* Question  28*/}
      <div className="field-sections">
        <span>Q.28:&nbsp;&nbsp;</span>
        <span>
          Delivery lead time for repeat orders (in working days)
          <span style={{ color: "red" }}>*</span>
        </span>
        <input
          onChange={handleChange}
          placeholder="This value must be a number"
          type="number"
          onInput={(e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-digit characters
          }}
          pattern="[0-9]*"
          name="Qs28_DeliveryLeadTimeRepeatOrder" // Add name attribute
          className="mt-3 outline-none w-100"
          id="name-text"
          required
        />
      </div>
      <h3 className="supplier-heading">Bank Information</h3>
      {/* Question  29*/}
      <div className="field-sections">
        <span>Q.29:&nbsp;&nbsp;</span>
        <span>
          Beneficiary Name<span style={{ color: "red" }}>*</span>
        </span>
        <input
          onChange={handleChange}
          placeholder="Enter your answer"
          type="text"
          name="Qs29_BeneficiaryName" // Add name attribute
          className="mt-3 outline-none w-100"
          id="name-text"
          required
        />
      </div>
      {/* Question  30*/}
      <div className="field-sections">
        <span>Q.30:&nbsp;&nbsp;</span>
        <span>
          Bank Name<span style={{ color: "red" }}>*</span>
        </span>
        <input
          onChange={handleChange}
          placeholder="Enter your answer"
          type="text"
          name="Qs30_BankName" // Add name attribute
          className="mt-3 outline-none w-100"
          id="name-text"
          required
        />
      </div>
      {/* Question  31*/}
      <div className="field-sections">
        <span>Q.31:&nbsp;&nbsp;</span>
        <span>
          Bank Address<span style={{ color: "red" }}>*</span>
        </span>
        <input
          onChange={handleChange}
          placeholder="Enter your answer"
          type="text"
          name="Qs31_BankAddress" // Add name attribute
          className="mt-3 outline-none w-100"
          id="name-text"
          required
        />
      </div>
      {/* Question  32*/}
      <div className="field-sections">
        <span>Q.32:&nbsp;&nbsp;</span>
        <span>Country of Bank A/C</span>
        <span style={{ color: "red" }}>*</span>
        <select
          value={supplierData.Qs32_CountryOfBankAC}
          onChange={(e) => {
            setSupplierData({
              ...supplierData,
              Qs32_CountryOfBankAC: e.target.value,
              Q32Other: e.target.value,
            });
          }}
          className="form-select"
          aria-label="Default select example"
          name="Qs32_CountryOfBankAC"
          required
        >
          <option disabled selected>
            Country of Bank Account
          </option>
          <option value="china">China</option>
          <option value="germany">Germany</option>
          <option value="hongkong">Hong Kong</option>
          <option value="india">India</option>
          <option value="taiwan">Taiwan</option>
          <option value="vietnam">Vietnam</option>
          {options32.map((option32) => (
            <option key={option32} value={option32}>
              {option32}
            </option>
          ))}
          <option value="other">Other</option>
        </select>
        {supplierData.Q32Other === "other" && (
          <div className="input-group w-25 mt-2">
            <input
              onChange={(e) => {
                setSupplierData({
                  ...supplierData,
                  Qs32_CountryOfBankAC: e.target.value,
                });
              }}
              type="text"
              className="form-control w-25 rounded"
              placeholder="Enter Custom Option"
              aria-label="Enter text..."
              name="Qs32_CountryOfBankAC"
              aria-describedby="basic-addon2"
            />
            <div className="input-group-append">
              <button
                className="btn btn-primary ms-2"
                type="button"
                onClick={() => {
                  if (
                    supplierData.Qs32_CountryOfBankAC.toLowerCase() !== "other"
                  ) {
                    setOptions32([supplierData.Qs32_CountryOfBankAC]);
                  }
                }}
              >
                Add Country Bank Account
              </button>
            </div>
          </div>
        )}
      </div>
      {/* Question  33*/}
      <div className="field-sections">
        <span>Q.33:&nbsp;&nbsp;</span>
        <span>Bank Phone</span>
        <div className="form-group d-flex">
          <select
            className="form-control countryCode me-1"
            id="countrySelect"
            name="Qs33_BankPhone"
          >
            {countryCode.map((country) => (
              <option key={country.code} value={country.dial_code}>
                {country.dial_code + "    " + " "} &nbsp; &nbsp;&nbsp;
                &nbsp;&nbsp; &nbsp;
                {" " + country.name}
              </option>
            ))}
          </select>
          -
          <input
            name="Qs33_BankPhone"
            placeholder="This value must be a number"
            type="number"
            onInput={(e) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-digit characters
            }}
            pattern="[0-9]*"
            onChange={handleChange}
            class="form-control ms-1 phoneNumberInput"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          ></input>
        </div>
      </div>
      {/* Question  34*/}
      <div className="field-sections">
        <span>Q.34:&nbsp;&nbsp;</span>
        <span>Bank Regional Number</span>
        <input
          onChange={handleChange}
          placeholder="Enter your answer"
          type="text"
          name="Qs34_BankRegionalNumber" // Add name attribute
          className="mt-3 outline-none w-100"
          id="name-text"
        />
      </div>
      {/* Question  35*/}
      <div className="field-sections">
        <span>Q.35:&nbsp;&nbsp;</span>
        <span>
          SWIFT<span style={{ color: "red" }}>*</span>
        </span>
        <input
          onChange={handleChange}
          placeholder="Enter your answer"
          type="text"
          name="Qs35_SWIFT" // Add name attribute
          className="mt-3 outline-none w-100"
          id="name-text"
          required
        />
      </div>
      {/* Question  36*/}
      <div className="field-sections">
        <span>Q.36:&nbsp;&nbsp;</span>
        <span>IBAN</span>
        <input
          onChange={handleChange}
          placeholder="Enter your answer"
          type="text"
          name="Qs36_IBAN" // Add name attribute
          className="mt-3 outline-none w-100"
          id="name-text"
        />
      </div>
      {/* Question  37*/}
      <div className="field-sections">
        <span>Q.37:&nbsp;&nbsp;</span>
        <span>
          Beneficiary Bank A/C Number
          <span style={{ color: "red" }}>*</span>
        </span>
        <input
          onChange={handleChange}
          placeholder="Enter your answer"
          type="text"
          name="Qs37_BeneficiaryBankACNumber" // Add name attribute
          className="mt-3 outline-none w-100"
          id="name-text"
          required
        />
      </div>
      {/* Question  38*/}
      <div className="field-sections">
        <span>Q.38:&nbsp;&nbsp;</span>
        <span>
          Select to whom you place orders{" "}
          <span style={{ color: "red" }}>*</span>
        </span>
        <br />
        <br />
        <label>
          <input
            type="radio"
            name="Qs38a_HCompanyPCompany"
            value="H Company"
            checked={supplierData.Qs38a_HCompanyPCompany === "H Company"}
            onChange={handleChange}
          />
          H Company
        </label>
        <label style={{ marginLeft: "1rem" }}>
          <input
            type="radio"
            name="Qs38a_HCompanyPCompany"
            value="P Company"
            checked={supplierData.Qs38a_HCompanyPCompany === "P Company"}
            onChange={handleChange}
          />
          P Company
        </label>
        <br />
        <br />

        <div>
          {supplierData.Qs38a_HCompanyPCompany === "H Company" && (
            <div className="field-sections">
              <span>
                Code of Conduct Signature and Upload{" "}
                <span style={{ color: "red" }}>*</span>
              </span>
              <br />
              <br />

              <button onClick={handleDownload} className="downloadFile">
                <FiDownload
                  style={{
                    margin: "0 5px 3px 0",
                    fontSize: "16px",
                  }}
                />
                DOWNLOAD FILE
              </button>

              <br />
              <label className="file-input-button-upload">
                <input
                  type="file"
                  accept="application/pdf,image/jpeg,image/png"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const MAX_FILE_SIZE_MB = 10;
                    const fileSizeMB = (
                      e.target.files[0].size /
                      1024 /
                      1024
                    ).toFixed(2);

                    if (fileSizeMB <= MAX_FILE_SIZE_MB) {
                      setFile(e.target.files[0]);
                    } else {
                      toast.error(`File size exceeds ${MAX_FILE_SIZE_MB}MB`, {
                        position: toast.POSITION.TOP_CENTER,
                      });
                    }
                  }}
                />
                <HiOutlineUpload
                  style={{
                    margin: "0 5px 3px 0",
                    fontSize: "16px",
                    display: file ? "none" : "inline-block",
                  }}
                />
                <span className="file-input-button-label">
                  {file ? `Uploaded file: ${file.name}` : "UPLOAD SIGNED FILE"}
                </span>
              </label>
            </div>
          )}
        </div>
      </div>
      {/* Question  39  Choose radio button show 40 question*/}
      <div className="field-sections">
        <span>Q.39:&nbsp;&nbsp;</span>
        <span>
          Does the Law on Corporate Due Diligence to Prevent Human Rights
          Violations in Supply Chains (LkSG) apply to your company according to
          § 1 LkSG?
        </span>
        <br />
        <br />
        <label>
          <input
            name="Qs39a_HumanRightsViolations"
            type="radio"
            value="yes"
            checked={supplierData.Qs39a_HumanRightsViolations === "yes"}
            onChange={handleChange}
          />
          Yes
        </label>

        <label style={{ marginLeft: "1rem" }}>
          <input
            type="radio"
            value="no"
            name="Qs39a_HumanRightsViolations"
            checked={supplierData.Qs39a_HumanRightsViolations === "no"}
            onChange={handleChange}
          />
          No
        </label>

        <br />

        <div>
          {supplierData.Qs39a_HumanRightsViolations === "yes" && (
            <div className="field-sections">
              <br />
              <label className="file-input-button-upload">
                <input
                  type="file"
                  accept="application/pdf,image/jpeg,image/png"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const MAX_FILE_SIZE_MB = 10;
                    const fileSizeMB = (
                      e.target.files[0].size /
                      1024 /
                      1024
                    ).toFixed(2);

                    if (fileSizeMB <= MAX_FILE_SIZE_MB) {
                      setDilligenceFile(e.target.files[0]);
                    } else {
                      toast.error(`File size exceeds ${MAX_FILE_SIZE_MB}MB`, {
                        position: toast.POSITION.TOP_CENTER,
                      });
                    }
                  }}
                />
                <HiOutlineUpload
                  style={{
                    margin: "0 5px 3px 0",
                    fontSize: "16px",
                    display: dilligenceFile ? "none" : "inline-block",
                  }}
                />
                <span className="file-input-button-label">
                  {dilligenceFile
                    ? `Uploaded file: ${dilligenceFile.name}`
                    : "UPLOAD DOCUMENT"}
                </span>
              </label>
              <br />
              {/* Question 40 */}
              <div className="field-sections">
                <span>Q.40:&nbsp;&nbsp;</span>
                <span>
                  Can you confirm that your company fulfils the due diligence
                  obligations contained in § 3 paragraph 1 sentence 2 LkSG?
                </span>
                <br />
                <br />
                <label>
                  <input
                    name="Qs40_ConfirmCompanyFulfilsDueDiligenceObligations"
                    type="radio"
                    value="yes"
                    checked={
                      supplierData.Qs40_ConfirmCompanyFulfilsDueDiligenceObligations ===
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
                    name="Qs40_ConfirmCompanyFulfilsDueDiligenceObligations"
                    checked={
                      supplierData.Qs40_ConfirmCompanyFulfilsDueDiligenceObligations ===
                      "no"
                    }
                    onChange={handleChange}
                  />
                  No
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Supplier2;

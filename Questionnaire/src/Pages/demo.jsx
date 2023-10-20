import React from "react";

const demo = () => {
  return (
    <div>
      {/* Question  38*/}
      <div className="field-sections">
        <span>{factoryJson.find((f) => f.id === "38").id}:&nbsp;&nbsp;</span>
        <span>
          {factoryJson.find((f) => f.id === "38").q}{" "}
          <span style={{ color: "red" }}>*</span>
        </span>
        <input
          name="Qf38_PersonalStructureAdmin"
          placeholder="This value must be a number from 0 and 100"
          type="text"
          onInput={(e) => {
            const value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-digit characters
            if (value < 0) e.target.value = "0";
            else if (value > 100) e.target.value = "100";
            else e.target.value = value;
          }}
          pattern="[0-9]*"
          onChange={handleChange}
          className="mt-3 outline-none w-100"
          id="name-text"
          aria-describedby="emailHelp"
        ></input>
      </div>
      {/* Question 39 */}
      <div className="field-sections">
        <span>
          {factoryJson.find((f) => f.id === "39").id}
          :&nbsp;&nbsp;
        </span>
        <span>{factoryJson.find((f) => f.id === "39").q}</span>
        <input
          name="Qf39_PersonalStructureProduction"
          placeholder="This value must be a number from 0 and 100"
          type="text"
          onInput={(e) => {
            const value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-digit characters
            if (value < 0) e.target.value = "0";
            else if (value > 100) e.target.value = "100";
            else e.target.value = value;
          }}
          pattern="[0-9]*"
          onChange={handleChange}
          className="mt-3 outline-none w-100"
          id="name-text"
          aria-describedby="emailHelp"
        ></input>
      </div>
      {/* Question 40 */}
      <div className="field-sections">
        <span>
          {factoryJson.find((f) => f.id === "40").id}
          :&nbsp;&nbsp;
        </span>
        <span>{factoryJson.find((f) => f.id === "40").q}</span>
        <input
          name="Qf40_PersonalStructureRandD"
          placeholder="This value must be a number from 0 and 100"
          type="text"
          onInput={(e) => {
            const value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-digit characters
            if (value < 0) e.target.value = "0";
            else if (value > 100) e.target.value = "100";
            else e.target.value = value;
          }}
          pattern="[0-9]*"
          onChange={handleChange}
          className="mt-3 outline-none w-100"
          id="name-text"
          aria-describedby="emailHelp"
        ></input>
      </div>
      {/* Question  41*/}
      <div className="field-sections">
        <span>{factoryJson.find((f) => f.id === "41").id}:&nbsp;&nbsp;</span>
        <span>
          {factoryJson.find((f) => f.id === "41").q}
          <span style={{ color: "red" }}>*</span>
        </span>
        <input
          name="Qf41_PersonalStructureQA"
          placeholder="This value must be a number from 0 and 100"
          type="text"
          onInput={(e) => {
            const value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-digit characters
            if (value < 0) e.target.value = "0";
            else if (value > 100) e.target.value = "100";
            else e.target.value = value;
          }}
          pattern="[0-9]*"
          onChange={handleChange}
          className="mt-3 outline-none w-100"
          id="name-text"
          aria-describedby="emailHelp"
        ></input>
      </div>
      {/* Question  42*/}
      <div className="field-sections">
        <span>{factoryJson.find((f) => f.id === "42").id}:&nbsp;&nbsp;</span>
        <span>
          {factoryJson.find((f) => f.id === "42").q}
          <span style={{ color: "red" }}>*</span>
        </span>
        <input
          name="Qf42_PersonalStructureManagement"
          placeholder="This value must be a number from 0 and 100"
          type="text"
          onInput={(e) => {
            const value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-digit characters
            if (value < 0) e.target.value = "0";
            else if (value > 100) e.target.value = "100";
            else e.target.value = value;
          }}
          pattern="[0-9]*"
          onChange={handleChange}
          className="mt-3 outline-none w-100"
          id="name-text"
          aria-describedby="emailHelp"
        ></input>
      </div>
      {/* Question  43*/}
      <div className="field-sections">
        <span>{factoryJson.find((f) => f.id === "43").id}:&nbsp;&nbsp;</span>
        <span>
          {factoryJson.find((f) => f.id === "43").q}
          <span style={{ color: "red" }}>*</span>
        </span>
        <input
          name="Qf43_WorkerStatisticMale"
          placeholder="This value must be a number from 0 and 100"
          type="text"
          onInput={(e) => {
            const value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-digit characters
            if (value < 0) e.target.value = "0";
            else if (value > 100) e.target.value = "100";
            else e.target.value = value;
          }}
          pattern="[0-9]*"
          onChange={handleChange}
          className="mt-3 outline-none w-100"
          id="name-text"
          aria-describedby="emailHelp"
        ></input>
      </div>
      {/* Question  44*/}
      <div className="field-sections">
        <span>{factoryJson.find((f) => f.id === "44").id}:&nbsp;&nbsp;</span>
        <span>
          {factoryJson.find((f) => f.id === "44").q}
          <span style={{ color: "red" }}>*</span>
        </span>
        <input
          name="Qf44_WorkerStatisticFemale"
          placeholder="This value must be a number from 0 and 100"
          type="text"
          onInput={(e) => {
            const value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-digit characters
            if (value < 0) e.target.value = "0";
            else if (value > 100) e.target.value = "100";
            else e.target.value = value;
          }}
          pattern="[0-9]*"
          onChange={handleChange}
          className="mt-3 outline-none w-100"
          id="name-text"
          aria-describedby="emailHelp"
        ></input>
      </div>
      {/* Question  45*/}
      <div className="field-sections">
        <span>{factoryJson.find((f) => f.id === "45").id}:&nbsp;&nbsp;</span>
        <span>
          {factoryJson.find((f) => f.id === "45").q}
          <span style={{ color: "red" }}>*</span>
        </span>
        <input
          name="Qf45_WorkerStatisticLocal"
          placeholder="This value must be a number from 0 and 100"
          type="text"
          onInput={(e) => {
            const value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-digit characters
            if (value < 0) e.target.value = "0";
            else if (value > 100) e.target.value = "100";
            else e.target.value = value;
          }}
          pattern="[0-9]*"
          onChange={handleChange}
          className="mt-3 outline-none w-100"
          id="name-text"
          aria-describedby="emailHelp"
        ></input>
      </div>
      {/* Question  46*/}
      <div className="field-sections">
        <span>{factoryJson.find((f) => f.id === "46").id}:&nbsp;&nbsp;</span>
        <span>
          {factoryJson.find((f) => f.id === "46").q}
          <span style={{ color: "red" }}>*</span>
        </span>
        <input
          name="Qf46_WorkerStatisticMigrant"
          placeholder="This value must be a number from 0 and 100"
          type="text"
          onInput={(e) => {
            const value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-digit characters
            if (value < 0) e.target.value = "0";
            else if (value > 100) e.target.value = "100";
            else e.target.value = value;
          }}
          pattern="[0-9]*"
          onChange={handleChange}
          className="mt-3 outline-none w-100"
          id="name-text"
          aria-describedby="emailHelp"
        ></input>
      </div>
    </div>
  );
};

export default demo;

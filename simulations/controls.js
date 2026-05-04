window.addEventListener("DOMContentLoaded", () => {

  // GLOBAL STATE
  window.controls = {
    mass: 12.5,
    type: "G",
    start: false,
  };

  const controls = window.controls;


  // ELEMENTS
  const slider = document.getElementById("massSlider");
  const label = document.getElementById("massValue");

  const startBtn = document.getElementById("start");
  const pauseBtn = document.getElementById("pause");
  const resetBtn = document.getElementById("reset");

  const typeButtons = document.querySelectorAll(".type-btn");

  // DEFAULT VALUES
  slider.value = controls.mass;
  label.textContent = controls.mass.toFixed(2);

  // HIGHLIGHTS SELECTED TYPE
  function setActiveType(type) {
    typeButtons.forEach(btn => {
      btn.classList.toggle("active", btn.dataset.type === type);
    });
  }

  setActiveType(controls.type);

  // MASS SLIDER
  slider.addEventListener("input", () => {
    controls.mass = parseFloat(slider.value);
    label.textContent = controls.mass.toFixed(2);
  });


  // TYPE BUTTONS
  typeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      controls.type = btn.dataset.type;
      setActiveType(controls.type);
    });
  });

  // START (event trigger)
  startBtn.addEventListener("click", () => {
    controls.start = true;
  });

});
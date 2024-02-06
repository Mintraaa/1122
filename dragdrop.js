document.addEventListener("DOMContentLoaded", (event) => {
  const train = document.getElementById("train");
  let carriageCount = 0;
  let dragged;

  window.addCarriage = function () {
    if (carriageCount < 15) {
      carriageCount++;
      const newCarriage = document.createElement("div");
      newCarriage.className = "carriage";
      newCarriage.setAttribute("draggable", true);
      newCarriage.id = "carriage" + carriageCount;
      newCarriage.textContent = "โบกี้ " + carriageCount;
      train.appendChild(newCarriage);
      addDragEvents(newCarriage);
    }
    const addDragEvents = (item) => {
      item.addEventListener("dragstart", (e) => {
        dragged = item;
        e.dataTransfer.setData("text/plain", item.id);

        // ถ้าเป็นหัวขบวนหรือท้ายขบวน ให้ยกเลิกการลาก
        if (item.id === "carriage1" || item.id === "tailCarriage") {
          e.preventDefault();
        }
      });
    };

    // เพิ่ม "ท้ายขบวนจ้า" ลงในท้ายของโบกี้ทั้งหมด
    addTailCarriage();
  };

  // ฟังก์ชันเพิ่ม "ท้ายขบวนจ้า" ลงในท้ายของโบกี้ทั้งหมด
  function addTailCarriage() {
    const existingTailCarriage = document.getElementById("tailCarriage");

    if (!existingTailCarriage) {
      const tailCarriage = document.createElement("div");
      tailCarriage.className = "carriage";
      tailCarriage.id = "tailCarriage";
      tailCarriage.textContent = "ท้ายขบวนจ้า";
      train.appendChild(tailCarriage);
      addDragEvents(tailCarriage);
    }
  }

  // จัดการกับการลากและวาง
  train.addEventListener("dragover", (e) => {
    e.preventDefault(); // อนุญาตให้วาง
  });

  train.addEventListener("drop", (e) => {
    e.preventDefault();
    if (dragged && e.target.className === "carriage") {
      // หาโบกี้ที่อยู่ใกล้ที่สุดและวางโบกี้ที่ลากมาก่อนหรือหลัง
      const afterElement = getDragAfterElement(train, e.clientX);
      if (afterElement == null) {
        train.appendChild(dragged);
      } else {
        train.insertBefore(dragged, afterElement);
      }
    }
  });

  // ฟังก์ชันสลับลำดับ
  window.swapTrainOrder = function () {
    const carriages = [...train.children];
    const reversedCarriages = carriages.reverse();
    train.innerHTML = "";
    reversedCarriages.forEach((carriage) => {
      train.appendChild(carriage);
    });
  };
});

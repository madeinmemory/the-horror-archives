console.log("SCRIPT.JS IS RUNNING");
// Constants

const archiveSections = document.querySelectorAll('.archive details');
const currentDirectory = document.querySelector('#current-directory');
const archiveItems = document.querySelectorAll('.archive p');
const recordTitle = document.querySelector('#record-title');
const recordDescription = document.querySelector('#record-description');
const recordType= document.querySelector('#record-type');
const recordDisplay = document.querySelector('.record-display');
const recordStatus = document.querySelector('#record-status');
const recordAccess = document.querySelector('#record-access');
const recordExpand = document.querySelector('#record-expand');
const recordExtra = document.querySelector('#record-extra');
const creditsButton = document.querySelector('#credits-button');
const creditsMenu = document.querySelector('#credits-menu');

const artPanels = document.querySelectorAll('.art-panel');

const leftArtImage = document.querySelector('#left-art-image');
const leftArtName = document.querySelector('#left-art-name');
const leftArtArtist = document.querySelector('#left-art-artist');
const leftArtDate = document.querySelector('#left-art-date');

const rightArtImage = document.querySelector('#right-art-image');
const rightArtName = document.querySelector('#right-art-name');
const rightArtArtist = document.querySelector('#right-art-artist');
const rightArtDate = document.querySelector('#right-art-date');


// Dropdown Toggle

archiveSections.forEach((section) => {
    section.addEventListener("toggle", () => {
       if (section.open) {
        currentDirectory.textContent = `CURRENT DIRECTORY // ${section.querySelector('summary').textContent}`
           archiveSections.forEach((otherSection) => {
                if (otherSection !== section) {
                    otherSection.open = false;
                    
                } 
        });
       } else {   const openSection = document.querySelector(".archive details[open]");
                if (!openSection) {
                    currentDirectory.textContent = `CURRENT DIRECTORY // NONE`;
            }                  
        }
    });
});

// Render Functions


function createRecordSelection(title, text) {
   
   const sectionTitle = document.createElement("h3");
         sectionTitle.textContent = title;
         recordExtra.appendChild(sectionTitle);

         const sectionText = document.createElement("p");
         sectionText.textContent = text;
         recordExtra.appendChild(sectionText);

         
}

function renderRegionRecord(record) {

   const locationTitle = document.createElement("h3");
         locationTitle.textContent = "LOCATION";
         recordExtra.appendChild(locationTitle);

         const locationText = document.createElement("p");
         locationText.textContent = record.location;
         recordExtra.appendChild(locationText);

         if (record.areas) {

    const areasTitle = document.createElement("h3");
    areasTitle.textContent = "AREAS / TOWNS";
    recordExtra.appendChild(areasTitle);

    record.areas.forEach((area) => {
        createRecordSelection(area.name, area.description);
    });
}

   const historyTitle = document.createElement("h3");
         historyTitle.textContent = "HISTORY";
         recordExtra.appendChild(historyTitle);

         const historyText = document.createElement("p");
         historyText.textContent = record.history;
         recordExtra.appendChild(historyText);


}

function renderHistoryRecord(record) {

   createRecordSelection("PERIOD", record.period);
   createRecordSelection("OVERVIEW", record.overview);

}

function renderTreedRecord(record) {
   if (record.overview) {
      createRecordSelection("OVERVIEW", record.overview);
   }

   if (record.structure) {
      createRecordSelection("STRUCTURE", record.structure);
   }
    
   if (record.authority) {
      createRecordSelection("AUTHORITY", record.authority);
   }
    
   if (record.capitals) {
      record.capitals.forEach((capital) => {
       
         const capitalTitle = document.createElement("h3");
         capitalTitle.textContent = capital.name;
         recordExtra.appendChild(capitalTitle);

         const capitalRegion = document.createElement("p");
         capitalRegion.textContent = `REGION // ${capital.region}`;
         recordExtra.appendChild(capitalRegion);

         const capitalDescription = document.createElement("p");
         capitalDescription.textContent = capital.description;
         recordExtra.appendChild(capitalDescription);
      });
   }
}

function renderFactionRecord(record) {

   createRecordSelection("ORIGIN", record.origin);
   createRecordSelection("MEMBER COUNT", record.memberCount);
}

function renderSupernaturalRecord(record) {
   createRecordSelection("DETAILS", record.details);
}

function renderArtwork(record) {
   console.log("ARTWORK RECORD:", record.artwork);

   const leftArtwork = record.artwork[0];
   const rightArtwork = record.artwork[1];


   leftArtImage.src = leftArtwork.image;
   leftArtName.textContent = leftArtwork.name;
   leftArtArtist.textContent = leftArtwork.artist;
   leftArtDate.textContent = leftArtwork.date;

   rightArtImage.src = rightArtwork.image;
   rightArtName.textContent = rightArtwork.name;
   rightArtArtist.textContent = rightArtwork.artist;
   rightArtDate.textContent = rightArtwork.date;

   artPanels.forEach((panel) =>  {
     panel.classList.remove("drop");

     void panel.offsetWidth;

     panel.classList.add("drop");

   }) 
}

// Dropdown Items/Selection and Text Displaying

archiveItems.forEach((item) => {
    item.addEventListener("click", () => {
      console.log("CLICKED:", item.textContent);
         currentDirectory.textContent = `SELECTED RECORD // ${item.textContent}`;
         recordTitle.textContent = item.textContent;
         const parentSection = item.closest('details');
         const sectionSummary = parentSection.querySelector('summary').textContent;
         const selectedRecord = records[item.textContent];
         recordExtra.innerHTML = "";
         recordExpand.disabled = selectedRecord.expandable === false;

         recordExtra.classList.remove("open");
         
         if (selectedRecord.expandable === false) {
            recordExpand.textContent = "NO ADDITIONAL DATA";
         } else {
            recordExpand.textContent = "SEE MORE ↓";
         }

         if (selectedRecord) {
            recordDescription.textContent = selectedRecord.description;
            recordStatus.textContent = selectedRecord.status,
            recordAccess.textContent = selectedRecord.access
            renderArtwork(selectedRecord);

         if (sectionSummary === "REGIONS") {
            renderRegionRecord(selectedRecord);
         }

         if (sectionSummary === "HISTORY") {
            renderHistoryRecord(selectedRecord);
         }

         if (sectionSummary === "TREED") {
            renderTreedRecord(selectedRecord);
         }

         if (sectionSummary === "FACTIONS") {
            renderFactionRecord(selectedRecord);
         }

         if (sectionSummary === "SUPERNATURAL RECORDS") {
            renderSupernaturalRecord(selectedRecord);
         }

         } else {
            recordDescription.textContent = "Description not available.";
            recordStatus.textContent = "UNAVAILABLE";
            recordAccess.textContent = "UNKNOWN";
         }
         recordType.textContent = `RECORD TYPE // ${sectionSummary}`;

         recordDisplay.classList.add("record-change");

         parentSection.open = false;
    });
});

// Animation Items Finishing

recordDisplay.addEventListener("animationend", () => {
      recordDisplay.classList.remove("record-change");
});

// SEE MORE Button

recordExpand.addEventListener("click", () => {
   const isOpen = recordExtra.classList.toggle("open");
      if (isOpen) {
        recordExpand.textContent = "SEE LESS↑";
      } else {
        recordExpand.textContent = "SEE MORE↓";
      }

});

// Credits Button

creditsButton.addEventListener("click", () => {
  creditsMenu.classList.toggle("open");
});
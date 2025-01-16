const path =
    "bibles/SF_2016-10-10_CZE_CZEB21_(CZECH BIBLE, PREKLAD 21_STOLETI).xml";
const outputDiv = document.getElementById("demo");

function run() {
    fetch(path)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then((xmlString) => {
            // Parse the XML string
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, "text/xml");

            // Extract verses
            const verses = [];
            const chapters = xmlDoc.getElementsByTagName("CHAPTER");

            for (let i = 0; i < chapters.length; i++) {
                const chapterNumber = chapters[i].getAttribute("cnumber");
                const versesElements = chapters[i].getElementsByTagName("VERS");

                for (let j = 0; j < versesElements.length; j++) {
                    const verseNumber =
                        versesElements[j].getAttribute("vnumber");
                    const verseText = versesElements[j].textContent.trim();
                    verses.push(
                        `Chapter ${chapterNumber}, Verse ${verseNumber}: ${verseText}`
                    );
                }
            }

            // Display verses in the div
            outputDiv.innerHTML = verses
                .map((verse) => `<p>${verse}</p>`)
                .join("");
        })
        .catch((error) => {
            console.error("Error fetching or processing XML:", error);
            outputDiv.textContent = "Failed to load XML.";
        });
}

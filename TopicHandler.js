class TopicHandler extends Topic {
    constructor() {
        super();
        this.printTopicAndRect();
        this.topicLinks = document.querySelectorAll(".topic-link");
        this.topicLinksRects = document.querySelectorAll(".info-rect");
        this.topHalf = document.getElementById("top");
        this.nameIcon = document.getElementById("name-icon");
        this.titleIcon = document.getElementById("title-icon");
        this.clickedLink = false;
        this.clickedLinkID;
        this.currentTopicTitleContainer = document.getElementById("current-topic-title");
        this.clickedTopicLogic();
    }

    printTopicAndRect() {
        // Loop through the topics and add a rect and associated topic name
        this.topics.forEach((topic, index) => {
            this.link = new TopicLink(index, topic);
            this.rect = new WordRect(index, topic);
        })
    }

    /********************** CLICK TOPIC LOGIC **************************/
    clickedTopicLogic() {
        this.topicLinks.forEach(link => {
            let linkName = link.id.split('-')[0];

            link.addEventListener("click", e => {
                if (this.clickedLink) {
                    this.moveCurrentClickedHeaderToOrignalPlace();
                }
                this.clickedLink = true;
                this.clickedLinkID = e.target.id;
                this.moveCurrentClickedValueToHeader(linkName);
                this.removeClickedLink(linkName, link);
                this.retractTopNameAndTitle();
                this.labelNotClicked();
            });

            this.mouseOverLinkEvent(link);
            this.mouseOutLinkEvent(link);
        })
    };

    moveCurrentClickedHeaderToOrignalPlace() {
        // This will move the header to the left out of the screen
        let currentHeader = document.getElementById(this.clickedLinkID);
        currentHeader.classList.add("moveHeaderLabelOutsideScreen");
    }

    moveCurrentClickedValueToHeader(linkName) {
        // Add name to current topic as the title in top left corner 
        this.currentTopicTitleContainer.textContent = linkName.toUpperCase();

        // Animation set so current title is moved to the title location
        this.currentTopicTitleContainer.classList.add("set-current-topic-title-top-left");
    }

    removeClickedLink(linkName, link) {
        // Remove rectangle and topic name  of clicked link
        let linkRect = document.getElementById(linkName + "-rect");
        linkRect.classList.add("rect-remove"); // Remove rect
        link.classList.add("topic-link-remove-animation"); // Remove topic name
    }

    retractTopNameAndTitle() {
        this.topHalf.classList.add("top-retract-animation");
        this.nameIcon.classList.add("name-icon-animation");
        this.titleIcon.classList.add("title-icon-animation");
    }

    labelNotClicked() {
        /* Called when label clicked, if not the label which is clicked, then fold
        it in */
        this.topicLinks.forEach(topic => {
            if (this.clickedLink && topic.id != this.clickedLinkID) {
                topic.classList.add("label-folded");

                let rect = document.getElementById(topic.id.split("-")[0] + "-rect");
                rect.classList.add("rect-folded");
            }
        });
    }

    /************************** HOVER LOGIC **********************************/

    mouseOverLinkEvent(link) {
        // Turn link yellow when hover over, fold all labels not hovered
        link.addEventListener("mouseover", e => {
            // Keep hovered link unfolded
            let linkHovered = document.getElementById(e.target.id);
            linkHovered.style.color = "yellow";

            this.labelNotHovered(e.target.id); // Fold hovered link
        })
    }

    mouseOutLinkEvent(link) {
        // If only hover over original links, when mouse out then return to normal
        link.addEventListener("mouseout", e => {
            // If just hovered then return links to normal
            if (!this.clickedLink) this.returnLablesToNormalUnclicked();
            else {
                // If a link as been clicked then return folded
            }
        })
    }

    labelNotHovered(clicked) {
        // Called in mouseOverLinkEvent, folds all non hovered links inward
        this.topicLinks.forEach(topic => {
            if (topic.id != clicked && !this.clickedLink) {
                // If not the hovered link, then fold it
                topic.classList.add("label-folded");

                let rect = document.getElementById(topic.id.split("-")[0] + "-rect");
                rect.classList.add("rect-folded");
            }
        });
    }

    returnLablesToNormalUnclicked() {
        // Called in mouseOutLinkEvent(), unfold the link and rect
        this.topicLinks.forEach(topic => {
            topic.classList.remove("label-folded");
            topic.style.color = "rgb(72, 72, 66)"; // Return color to grey

            let rect = document.getElementById(topic.id.split("-")[0] + "-rect");
            rect.classList.remove("rect-folded");

        });
    }

    // // addClickedLinkBack(){
    // //     // Move name and rect back to the page when new topic clicked
    // //     let currentTitle = document.getElementById(this.clickedLinkID);
    // // }











    // returnLablesToNormalClicked() {
    //     this.topicLinks.forEach(topic => {
    //         if (this.clickedLinkID != topic.id) {
    //             topic.style.color = "rgb(72, 72, 66)"; // Return color to grey

    //             let rect = document.getElementById(topic.id.split("-")[0] + "-rect");
    //         }
    //     });
    // }
}
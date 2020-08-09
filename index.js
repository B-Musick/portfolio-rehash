class Topic{
    // Oulines both the Word and the rectangle associated
    constructor(index, topic){
        this.topics = ["technology", "courses", "learning", "projects", "about"];
        this.topic = topic;
        this.index = index;
        this.topicBaseSpacingFromBottom = 14; // Represents percent
        this.verticalSpacing = 6;
        this.rectBaseWidth = 18;
        this.horizontalWordSpacingMultiplier = 5;
        this.container = document.getElementById("topic-links-container");

        if (this.constructor == Topic) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }
}

class WordRect extends Topic{
    constructor(index, topic) {
        super(index, topic);
        this.rect = document.createElement("div");
        this.createRectAssociatedWithLink();
    }

    createRectAssociatedWithLink() {
        // Create the rect associated with the link
        this.rect.className = "info-rect";
        this.rect.id = this.topic + "-rect";

        // Add CSS styling
        this.rect.style.width = this.rectBaseWidth + (this.horizontalWordSpacingMultiplier * (this.topics.length - this.index)) + "%";
        this.rect.style.bottom = this.topicBaseSpacingFromBottom + this.verticalSpacing * (this.index % this.topics.length) + "%";

        this.container.appendChild(this.rect); // Add to the container
    }
}

class TopicLink extends Topic {
    constructor(index, topic){
        super(index, topic);
        this.wordRectSpacing = 1;
        this.fontSize = 4;
        // Create the link associated with the rect
        this.link = document.createElement("a");
        this.linkTopic = document.createElement("div");
        this.createLinkName();
    }

    createLinkName(){
        // Add class name to link name
        this.linkTopic.className = "topic-link";
        this.linkTopic.id = this.topic + "-link";

        this.linkTopic.style.bottom = this.topicBaseSpacingFromBottom + this.verticalSpacing * (this.index % this.topics.length) - this.fontSize / 2 + "%";
        this.linkTopic.style.right = this.rectBaseWidth + (this.horizontalWordSpacingMultiplier * (this.topics.length - this.index)) + this.wordRectSpacing + "%";

        this.linkTopic.innerHTML = this.topic.toUpperCase();
        this.link.appendChild(this.linkTopic);

        this.container.appendChild(this.link); // Add to the container
    }
}

class TopicHandler extends Topic{
    constructor(){
        super();
        this.printTopicAndRect();
        this.topicLinks = document.querySelectorAll(".topic-link");
        this.topicLinksRects = document.querySelectorAll(".info-rect");
        this.topHalf = document.getElementById("top");
        this.nameIcon = document.getElementById("name-icon");
        this.titleIcon = document.getElementById("title-icon");
        this.clickedLink = false;
        this.currentTopicTitleContainer = document.getElementById("current-topic-title");
        this.clickedTopicLogic();
    }

    printTopicAndRect(){
        this.topics.forEach((topic, index) => {
            // Loop through the topics and add a rect and associated topic name
            this.link = new TopicLink(index, topic);

            this.rect = new WordRect(index, topic);
        })
    }

    clickedTopicLogic(){
        /********************** CLICK TOPIC LOGIC **************************/
        this.topicLinks.forEach(link => {
            let linkName = link.id.split('-')[0];
            // let topRetractSizeId = linkName +"-retract-top-size";

            link.addEventListener("click", e => {
                this.clickedLink = true;
                this.moveCurrentClickedValueToHeader(linkName);
                this.removeClickedLink(linkName,link);
                this.retractTopNameAndTitle();
                this.labelNotClicked(e.target.id);
            });

            this.mouseOverLinkEvent(link);
            this.mouseOutLinkEvent(link);
        })
    };

    retractTopNameAndTitle(){
        this.topHalf.classList.add("top-retract-animation");
        this.nameIcon.classList.add("name-icon-animation");
        this.titleIcon.classList.add("title-icon-animation");
    }

    removeClickedLink(linkName,link){
        // Remove rectangle of clicked link
        let linkRect = document.getElementById(linkName + "-rect");
        linkRect.classList.add("rect-remove");
        link.classList.add("topic-link-remove-animation");
    }

    moveCurrentClickedValueToHeader(linkName){
        // Add name to current topic as the title in top left corner 
        this.currentTopicTitleContainer.textContent = linkName.toUpperCase();

        // Animation set so current title is moved to the title location
        this.currentTopicTitleContainer.classList.add("set-current-topic-title-top-left");
    }
    mouseOutLinkEvent(link) {
        link.addEventListener("mouseout", e => {
            // If just hovered then return links to normal
            if (!this.clickedLink) this.returnLablesToNormal();
        })
    }

    mouseOverLinkEvent(link){
        link.addEventListener("mouseover", e => {
            let linkHovered = document.getElementById(e.target.id);
            linkHovered.style.color = "yellow";

            this.labelNotHovered(e.target.id)
        })
    }

    labelNotClicked(clicked){
        /* Called when label clicked, if not the label which is clicked, then fold
        it in */
        this.topicLinks.forEach(topic => {
            console.log(clicked)
            if (topic.id != clicked) {
                topic.classList.add("label-folded");

                let rect = document.getElementById(topic.id.split("-")[0] + "-rect");
                rect.classList.add("rect-folded");
            }
        });
    }

    labelNotHovered (clicked){
        this.topicLinks.forEach(topic => {

            if (topic.id != clicked) {
                topic.classList.add("label-folded");

                let rect = document.getElementById(topic.id.split("-")[0] + "-rect");
                rect.classList.add("rect-folded");
            }
        });
    }

    returnLablesToNormal(){
        this.topicLinks.forEach(topic => {

            topic.classList.remove("label-folded");
            topic.style.color = "rgb(72, 72, 66)"; // Return color to grey

            let rect = document.getElementById(topic.id.split("-")[0] + "-rect");
            rect.classList.remove("rect-folded");

        });
    }
        
}

let topicHandler = new TopicHandler();

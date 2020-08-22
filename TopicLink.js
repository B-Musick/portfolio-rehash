class TopicLink extends Topic {
    constructor(index, topic) {
        super(index, topic);
        this.wordRectSpacing = 1;
        this.fontSize = 4;
        // Create the link associated with the rect
        this.link = document.createElement("a");
        this.linkTopic = document.createElement("div");
        this.createLinkName();
    }

    createLinkName() {
        this.setClassAndIdToLink();
        this.setLinkCSSStyles();
        this.setTopicName();
    }

    setClassAndIdToLink() {
        // Add class name to link name
        this.linkTopic.className = "topic-link";
        this.linkTopic.id = this.topic + "-link";
    }

    setLinkCSSStyles() {
        this.linkTopic.style.bottom = this.topicBaseSpacingFromBottom + this.verticalSpacing * (this.index % this.topics.length) - this.fontSize / 2 + "%";
        this.linkTopic.style.right = this.rectBaseWidth + (this.horizontalWordSpacingMultiplier * (this.topics.length - this.index)) + this.wordRectSpacing + "%";
    }

    setTopicName() {
        this.linkTopic.innerHTML = this.topic.toUpperCase();
        this.link.appendChild(this.linkTopic);
        this.container.appendChild(this.link); // Add to the container
    }
}
class Topic {
    // Oulines both the Word and the rectangle associated
    constructor(index, topic) {
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
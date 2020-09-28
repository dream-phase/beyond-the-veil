export default class Dialogue {
  constructor(dialogue, game) {
    this.dialogue = dialogue; // reference to dialogue object
    this.game = game; // reference to phaser this
    this.currentNode = dialogue.subtree;
    this.lineIndex = 0; // which line of dialogue
    this.dialogueBox; // image object
    this.speakerText; // text object
    this.lineText; // text object
    this.choiceTexts = []; // choice text objects;
    this.hasToMakeChoice = false;
  }

  startDialogue() {
    this.game.input.on(
      "gameobjectup",
      function (pointer, gameObject) {
        gameObject.emit("clicked", gameObject);
      },
      this
    );

    const self = this;
    this.game.inDialogue = true;
    const dialogueLeaf = this.currentNode[this.lineIndex];
    this.dialogueBox = this.game.add.image(500, 520, "dialoguebox");
    this.dialogueBox.setInteractive();
    this.dialogueBox.on(
      "clicked",
      () => {
        if (!self.hasToMakeChoice) {
          self.playNextLine();
        }
      },
      this
    );
    this.speakerText = this.game.add
      .text(65, 445, dialogueLeaf.speaker)
      .setFontSize(24)
      .setColor("white");
    this.speakerText.setInteractive();
    this.speakerText.on("clicked", this.playNextLine, this);
    this.lineText = this.game.add
      .text(50, 495, dialogueLeaf.line, {
        wordWrap: { width: 800, useAdvancedWrap: true },
      })
      .setFontSize(24)
      .setColor("black");
    this.lineText.setInteractive();
    this.lineText.on("clicked", this.playNextLine, this);
  }

  stopDialogue() {
    console.log("finish dialogue");
    this.game.inDialogue = false;
    this.speakerText.destroy();
    this.speakerText = null;
    this.lineText.destroy();
    this.lineText = null;
    this.hasToMakeChoice = false;
    this.choiceTexts.forEach((choice) => choice.destroy());
    this.dialogueBox.destroy();
    this.dialogueBox = null;
  }

  updateText() {
    const dialogueLeaf = this.currentNode[this.lineIndex];
    const self = this;

    // reset choice text objects
    if (this.choiceTexts.length > 0) {
      this.choiceTexts.forEach((choice) => choice.destroy());
      this.choiceTexts = [];
    }
    // add choice text
    if (dialogueLeaf.choices && dialogueLeaf.choices.length > 0) {
      this.hasToMakeChoice = true;
      this.lineText.setText("");
      dialogueLeaf.choices.forEach((choice, i) => {
        const textObj = this.game.add.text(50, 495 + i * 32, choice[0].line, {
          font: "24px",
          wordwrap: 500,
        });
        textObj.setColor("black");
        this.choiceTexts.push(textObj);
      });
      this.choiceTexts.forEach((choice, i) => {
        choice.setInteractive();
        choice.on(
          "clicked",
          () => {
            self.makeChoice(i);
          },
          this
        );
        choice.on(
          "pointerover",
          () => {
            choice.setColor("#9b1c31");
          },
          this
        );
        choice.on(
          "pointerout",
          () => {
            choice.setColor("#000");
          },
          this
        );
      });
    } else {
      this.speakerText.setText(dialogueLeaf.speaker);
      this.lineText.setText(dialogueLeaf.line);
    }
  }

  makeChoice(choiceIndex) {
    // if there are choices, move to subtree
    this.hasToMakeChoice = false;
    if (this.currentNode[this.lineIndex]) {
      this.currentNode = this.currentNode[this.lineIndex].choices[choiceIndex];
      this.lineIndex = 0;
      this.choiceTexts.forEach((choice) => choice.destroy());
      this.choiceTexts = [];
      this.updateText();
    }
  }

  playNextLine() {
    if (this.currentNode[this.lineIndex].end) {
      // if at end of dialogue
      this.stopDialogue();
    } else {
      if (this.lineIndex < this.currentNode.length) {
        this.lineIndex += 1;
      }
      this.updateText();
      // set changes to world state
      if (this.currentNode[this.lineIndex].variables) {
        Othis.currentNode[this.lineIndex].variables.forEach((variable) => {
          this.game.variables[variable.name] = variable.value;
        });
      }
    }
  }
}

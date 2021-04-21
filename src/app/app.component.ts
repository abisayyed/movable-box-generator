import { DOCUMENT } from "@angular/common";
import { Component, Inject } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "Flytbase Assignment Movable-box-generator";

  Boxes: any = [];
  selectedBox: any;
  SquareFocusedId: number;
  IsSquareFocused: boolean;
  pixelCounter: number = 25;
  IsToggle: boolean = true;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.keyListener();
  }

  onToggleKeyListen(_ev: boolean) {
    this.IsToggle = _ev;
  }

  keyListener() {
    let global = this;

    this.document.addEventListener("keydown", function (_ev) {
      let KeyPressed = _ev.key ? _ev.key : null;
      let IsDelete = KeyPressed === "Delete" && global.IsSquareFocused;
      let IsLeft = KeyPressed === "a" && global.IsSquareFocused;
      let IsRight = KeyPressed === "d" && global.IsSquareFocused;
      let IsDown = KeyPressed === "s" && global.IsSquareFocused;
      let IsUp = KeyPressed === "w" && global.IsSquareFocused;

      if (global.IsToggle) {
        if (IsDelete) {
          global.onDeleteBox();
        } else if (IsLeft) {
          global.BoxToLeft();
        } else if (IsRight) {
          global.BoxToRight();
        } else if (IsUp) {
          global.BoxToUp();
        } else if (IsDown) {
          global.BoxToDown();
        }
      }
    });
  }

  BoxToLeft() {
    let selectedStyle = this.selectedBox?.style;
    let pixels = selectedStyle.right?.split("px")[0];

    selectedStyle.right = `${Number(pixels) + this.pixelCounter}px`;
    // console.log(`selectedStyle.right`, selectedStyle.right);

    // Decrease Left
    let SelectedLeft = selectedStyle.left?.split("px")[0];
    selectedStyle.left = `${Number(SelectedLeft) - this.pixelCounter}px`;
  }

  BoxToUp() {
    let selectedStyle = this.selectedBox?.style;
    let pixels = selectedStyle.bottom?.split("px")[0];
    selectedStyle.bottom = `${Number(pixels) + this.pixelCounter}px`;
    // console.log(`selectedStyle.bottom`, selectedStyle.bottom);

    // Decrease Top
    let SelectedTop = selectedStyle.top.split("px")[0];
    selectedStyle.top = `${Number(SelectedTop) - this.pixelCounter}px`;
  }

  BoxToRight() {
    let selectedStyle = this.selectedBox?.style;
    let pixels = selectedStyle.left?.split("px")[0];

    selectedStyle.left = `${Number(pixels) + this.pixelCounter}px`;
    // console.log(`selectedStyle.left`, selectedStyle.left);

    // Decrease Right
    let SelectedRight = selectedStyle.right.split("px")[0];
    selectedStyle.right = `${Number(SelectedRight) - this.pixelCounter}px`;
  }

  BoxToDown() {
    let selectedStyle = this.selectedBox?.style;
    let pixels = selectedStyle.top?.split("px")[0];
    selectedStyle.top = `${Number(pixels) + this.pixelCounter}px`;
    // console.log(`selectedStyle.top`, selectedStyle.top);

    // Decrease Right
    let SelectedBottom = selectedStyle.bottom.split("px")[0];
    selectedStyle.bottom = `${Number(SelectedBottom) - this.pixelCounter}px`;
  }

  onDeleteBox() {
    this.selectedBox.remove();
  }

  onBox(id: number) {
    this.SquareFocusedId = id;
    this.IsSquareFocused = true;
    let FocusedBox = document.getElementById(`${id}`);
    this.selectedBox = FocusedBox;
  }

  addBox() {
    try {
      let Id = this.onGenerateUniqueId();
      this.Boxes.push(Id);
    } catch (e) {
      console.log("Error catched in Addbox", e);
    }
  }

  /**
   * onGenerateUniqueId: Function to generate unique box Id.
   */

  onGenerateUniqueId() {
    return Math.round(Date.now() + Math.random());
  }
}

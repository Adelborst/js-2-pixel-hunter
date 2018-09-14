import {getGame} from "../templates/game";
import {getGameQuestion3} from "../templates/game-3";
import {AnswerType} from "../../data/questions";
import ScreenView from "../common/screen";
import EventEmitter from "../../utils/event-emitter";

// Игровой экран с тремя изображениями
export class Game3View extends ScreenView {
  constructor(game, question) {
    super();
    this.game = game;
    this.question = question;
    this.eventEmitter = new EventEmitter();
  }

  get _template() {
    return getGame(this.game, getGameQuestion3(this.question));
  }

  _bind(_element) {
    super._bind(_element);

    _element
      .querySelector(`.game__content`)
      .addEventListener(`click`, (event) => {
        const target = event.target.closest(`.game__option`);

        if (!target) {
          return;
        }

        const gameOptions = this._getCheckedInputs();
        const answerIndex = gameOptions.indexOf(target);

        if (answerIndex === -1) {
          throw new Error(`game option doesn't exist`);
        }

        const options = Array.from(
            {length: this.question.answers.length},
            () => AnswerType.PHOTO
        );

        options[answerIndex] = AnswerType.PAINTING;

        const answer = {
          id: this.question.id,
          options,
          time: this.game.state.time
        };

        this.eventEmitter.fire(`answer`, answer);
      });
  }

  _getCheckedInputs() {
    return Array.from(this.element.querySelectorAll(`.game__option`));
  }
}

import { ButtonType } from "types/button.type";

export interface IButtonProps {
    buttonClass?: string;
    imgClass?: string;
    imgSrc?: string;
    text?: string;
    type?: ButtonType;
    func?: any;
}

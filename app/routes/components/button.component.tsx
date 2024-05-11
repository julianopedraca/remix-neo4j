import { ButtonProps } from "interfaces/button-props.interface";

export default function Button({ buttonClass, imgClass, imgSrc, text, type=undefined, func } : ButtonProps) {
    return (
        <button type={type} className={buttonClass} onClick={func}>
            {
                imgSrc ? (
                    <img className={imgClass} src={imgSrc} />
                ) : null
            }
            {text ? text : null}
        </button>

    );
}

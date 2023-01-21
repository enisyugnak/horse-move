import React from "react";

export default function BoardItem(props){

    const {itemClicked,status,disabled,id,row,col} = props;
    const customClass = changeClass();
    const numbers= false;

    function changeClass(){
        switch (status) {
            case "first-captured":
                return "board--item first-captured"          
            case "captured":
                return "board--item captured"
            case "chosen":
                return "board--item chosen"           
            default:
                return "board--item"
        }
    }

    return (
        <div
        className = {customClass}
        disabled = {disabled}
        onClick = {itemClicked}
        key = {id}
        >
        { numbers && <span>{row + "-"+ col}</span>}
        </div>
    );
}
import MyButton from "./MyButton";

const variants = [
    "primary", "secondary", "success", "warning", "link"
];


export default {
    component: MyButton,
    title: "適当に作ったボタン",
    argTypes:{
        variant:{
            control:{
                type: "select",
                labels: Object.fromEntries(variants.map((v) => [v, v]))
            },
            options: variants,
        },
        fontSize:{
            control:{
                type: "range",
                min: 1,
                max: 50,
                step: 1
            }
        },
        color:{
            control:{
                type: "color"
            }
        }
    }
}

const Template = args => <MyButton {...args} >これは適当に作ったボタンです</MyButton>

export const ぼたん = Template.bind({});
ぼたん.args = {
    variant: "secondary",
    fontSize: 15,
    color: "white"
};

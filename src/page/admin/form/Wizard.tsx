import schema2component from "../../../components/schema2component";


const schema = {
    type: 'page',
    title: '表单向导',
    subTitle: '可以通过表单向导，将一个超长的表单页面拆分成多个步骤，一步一步指引用户完成。',
    body: [
        {
            type: 'wizard',
            actionFinishLabel: "确认",
            api: "/api/saveWizard",
            steps: [
                {
                    title: "填写活动信息",
                    controls: [
                        {
                            type: "text",
                            name: "title",
                            label: "活动标题",
                            required: true,
                            size: "md"
                        },

                        {
                            type: "date",
                            name: "date",
                            label: "举办时间",
                            size: "md"
                        },

                        {
                            type: "number",
                            name: "num",
                            label: "参与人数",
                            value: 10,
                            size: "md"
                        }
                    ]
                },

                {
                    title: "填写赞助商信息",
                    controls: [
                        {
                            type: "text",
                            name: "company",
                            label: "公司名称",
                            required: true,
                            size: "md"
                        },

                        {
                            type: "text",
                            name: "money",
                            label: "赞助金额",
                            addOn: {
                                type: "text",
                                label: "￥"
                            },
                            size: "md"
                        }
                    ]
                },

                {
                    title: "确认",
                    mode: 'horizontal',
                    horizontal: {
                        leftFixed: 'sm'
                    },
                    controls: [
                        {
                            type: "static",
                            name: "company",
                            label: "活动标题",
                            labelClassName: "text-muted"
                        },
                        {
                            type: "static-date",
                            name: "date",
                            label: "举办时间",
                            labelClassName: "text-muted"
                        },
                        {
                            type: "static",
                            name: "num",
                            label: "参与人数",
                            labelClassName: "text-muted"
                        },
                        {
                            type: "static",
                            name: "company",
                            label: "公司名称",
                            labelClassName: "text-muted"
                        },
                        {
                            type: "static",
                            name: "money",
                            label: "赞助金额",
                            labelClassName: "text-muted"
                        }
                    ]
                }
            ]
        }
    ]
};

export default schema2component(schema);
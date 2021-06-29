import React from 'react';
import { withInfo } from '@storybook/addon-info'
import { configure, addDecorator, addParameters } from "@storybook/react";
import "../src/style/index.scss"
// automatically import all files ending in *.stories.tsx
const req = require.context("../src", true, /.stories.tsx$/);
const wrapperStyle: React.CSSProperties = {
    padding: '20px 40px'
}
const storyWrapper = (storyFn: any) => <div style={wrapperStyle}>
    <h3>组件展示</h3>
    {storyFn()}
</div>
addDecorator(storyWrapper)
addDecorator(withInfo)
addParameters({
    info: {
        inline: true,
        header: false,
    },
})
configure(req, module);
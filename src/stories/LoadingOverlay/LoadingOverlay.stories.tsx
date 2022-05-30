import { ComponentStory, ComponentMeta } from "@storybook/react";

import LoadingOverlay from "@stories/LoadingOverlay/LoadingOverlay";

export default {
  title: "Core/Loaders/LoadingOverlay",
  text: LoadingOverlay.name,
  component: LoadingOverlay,
  argTypes: {
    show: {
      defaultValue: true,
    },
    message: {
      defaultValue: "",
    },
  },
} as ComponentMeta<typeof LoadingOverlay>;

const DefaultTemplate: ComponentStory<typeof LoadingOverlay> = (args) => (
  <div
    style={{
      height: "100%",
      width: "90vw",
      backgroundColor: "white",
      display: "flex",
    }}
  >
    <div style={{ padding: "25px" }}>
      <h3>Lorem ipsum</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec ipsum at
        nunc tempus bibendum. Etiam feugiat arcu eget eros vulputate, ac euismod
        mi dignissim. Ut commodo, magna eget hendrerit condimentum, risus nisi
        mollis ipsum, et malesuada diam eros non metus. Praesent id ligula
        ullamcorper, vulputate felis sed, feugiat nulla. Quisque commodo rhoncus
        massa sed imperdiet. Etiam rhoncus porttitor felis, ut porta nibh auctor
        quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
        eget mattis turpis.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec ipsum at
        nunc tempus bibendum. Etiam feugiat arcu eget eros vulputate, ac euismod
        mi dignissim. Ut commodo, magna eget hendrerit condimentum, risus nisi
        mollis ipsum, et malesuada diam eros non metus. Praesent id ligula
        ullamcorper, vulputate felis sed, feugiat nulla. Quisque commodo rhoncus
        massa sed imperdiet. Etiam rhoncus porttitor felis, ut porta nibh auctor
        quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
        eget mattis turpis.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec ipsum at
        nunc tempus bibendum. Etiam feugiat arcu eget eros vulputate, ac euismod
        mi dignissim. Ut commodo, magna eget hendrerit condimentum, risus nisi
        mollis ipsum, et malesuada diam eros non metus. Praesent id ligula
        ullamcorper, vulputate felis sed, feugiat nulla. Quisque commodo rhoncus
        massa sed imperdiet. Etiam rhoncus porttitor felis, ut porta nibh auctor
        quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
        eget mattis turpis.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec ipsum at
        nunc tempus bibendum. Etiam feugiat arcu eget eros vulputate, ac euismod
        mi dignissim. Ut commodo, magna eget hendrerit condimentum, risus nisi
        mollis ipsum, et malesuada diam eros non metus. Praesent id ligula
        ullamcorper, vulputate felis sed, feugiat nulla. Quisque commodo rhoncus
        massa sed imperdiet. Etiam rhoncus porttitor felis, ut porta nibh auctor
        quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
        eget mattis turpis.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec ipsum at
        nunc tempus bibendum. Etiam feugiat arcu eget eros vulputate, ac euismod
        mi dignissim. Ut commodo, magna eget hendrerit condimentum, risus nisi
        mollis ipsum, et malesuada diam eros non metus. Praesent id ligula
        ullamcorper, vulputate felis sed, feugiat nulla. Quisque commodo rhoncus
        massa sed imperdiet. Etiam rhoncus porttitor felis, ut porta nibh auctor
        quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
        eget mattis turpis.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec ipsum at
        nunc tempus bibendum. Etiam feugiat arcu eget eros vulputate, ac euismod
        mi dignissim. Ut commodo, magna eget hendrerit condimentum, risus nisi
        mollis ipsum, et malesuada diam eros non metus. Praesent id ligula
        ullamcorper, vulputate felis sed, feugiat nulla. Quisque commodo rhoncus
        massa sed imperdiet. Etiam rhoncus porttitor felis, ut porta nibh auctor
        quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
        eget mattis turpis.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec ipsum at
        nunc tempus bibendum. Etiam feugiat arcu eget eros vulputate, ac euismod
        mi dignissim. Ut commodo, magna eget hendrerit condimentum, risus nisi
        mollis ipsum, et malesuada diam eros non metus. Praesent id ligula
        ullamcorper, vulputate felis sed, feugiat nulla. Quisque commodo rhoncus
        massa sed imperdiet. Etiam rhoncus porttitor felis, ut porta nibh auctor
        quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
        eget mattis turpis.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec ipsum at
        nunc tempus bibendum. Etiam feugiat arcu eget eros vulputate, ac euismod
        mi dignissim. Ut commodo, magna eget hendrerit condimentum, risus nisi
        mollis ipsum, et malesuada diam eros non metus. Praesent id ligula
        ullamcorper, vulputate felis sed, feugiat nulla. Quisque commodo rhoncus
        massa sed imperdiet. Etiam rhoncus porttitor felis, ut porta nibh auctor
        quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
        eget mattis turpis.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec ipsum at
        nunc tempus bibendum. Etiam feugiat arcu eget eros vulputate, ac euismod
        mi dignissim. Ut commodo, magna eget hendrerit condimentum, risus nisi
        mollis ipsum, et malesuada diam eros non metus. Praesent id ligula
        ullamcorper, vulputate felis sed, feugiat nulla. Quisque commodo rhoncus
        massa sed imperdiet. Etiam rhoncus porttitor felis, ut porta nibh auctor
        quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
        eget mattis turpis.
      </p>
    </div>
    <LoadingOverlay {...args} />
  </div>
);
export const Default = DefaultTemplate.bind({});
Default.args = {
  show: true,
  message: "Loading some content...",
};

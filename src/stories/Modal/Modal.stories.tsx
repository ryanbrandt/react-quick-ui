import { ComponentStory, ComponentMeta } from "@storybook/react";

import Modal from "@stories/Modal/Modal";

export default {
  title: "Core/Modal",
  text: Modal.name,
  component: Modal,
  argTypes: {
    open: {
      defaultValue: true,
    },
    animated: {
      defaultValue: false,
    },
    onClose: {
      control: false,
    },
  },
} as ComponentMeta<typeof Modal>;

const DefaultTemplate: ComponentStory<typeof Modal> = (args) => (
  <div
    style={{
      height: "100%",
      width: "90vw",
      backgroundColor: "white",
      display: "flex",
    }}
  >
    <Modal {...args}>
      <div
        style={{
          padding: "25px",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2>Its a Modal!</h2>
        <p>This is where modal content would go</p>
      </div>
    </Modal>
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
  </div>
);
export const Default = DefaultTemplate.bind({});
Default.args = {
  open: true,
  animated: false,
};

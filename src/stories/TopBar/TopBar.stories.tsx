import { ComponentStory, ComponentMeta } from "@storybook/react";

import TopBar from "@stories/TopBar/TopBar";
import Button from "@stories/Button/Button";

export default {
  title: "Core/Menus/TopBar",
  text: TopBar.name,
  component: TopBar,
  argTypes: {
    sticky: { defaultValue: false },
  },
} as ComponentMeta<typeof TopBar>;

const DefaultTemplate: ComponentStory<typeof TopBar> = (args) => (
  <div
    style={{
      height: "100%",
      width: "90vw",
      backgroundColor: "white",
    }}
  >
    <TopBar {...args}>
      <div
        style={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          padding: "0px 20px",
          justifyContent: "space-between",
        }}
      >
        <Button text="Sign Out" variant="danger" />
      </div>
    </TopBar>
    <div style={{ padding: "25px", overflowY: "auto" }}>
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

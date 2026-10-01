import type { Meta, StoryObj } from "@storybook/react-vite";

import LoadingOverlay from "@stories/LoadingOverlay/LoadingOverlay";

const meta = {
  title: "Core/Loaders/LoadingOverlay",
  component: LoadingOverlay,
  args: { show: true, message: "Loading some content..." },
  parameters: {
    // The overlay is position: fixed; render it in its own iframe on the docs
    // page so it doesn't cover the whole page.
    docs: { story: { inline: false, iframeHeight: 400 } },
  },
  render: (args) => (
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec ipsum
          at nunc tempus bibendum. Etiam feugiat arcu eget eros vulputate, ac
          euismod mi dignissim. Ut commodo, magna eget hendrerit condimentum,
          risus nisi mollis ipsum, et malesuada diam eros non metus. Praesent id
          ligula ullamcorper, vulputate felis sed, feugiat nulla. Quisque
          commodo rhoncus massa sed imperdiet. Etiam rhoncus porttitor felis, ut
          porta nibh auctor quis. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Donec eget mattis turpis.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec ipsum
          at nunc tempus bibendum. Etiam feugiat arcu eget eros vulputate, ac
          euismod mi dignissim. Ut commodo, magna eget hendrerit condimentum,
          risus nisi mollis ipsum, et malesuada diam eros non metus. Praesent id
          ligula ullamcorper, vulputate felis sed, feugiat nulla. Quisque
          commodo rhoncus massa sed imperdiet. Etiam rhoncus porttitor felis, ut
          porta nibh auctor quis. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Donec eget mattis turpis.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec ipsum
          at nunc tempus bibendum. Etiam feugiat arcu eget eros vulputate, ac
          euismod mi dignissim. Ut commodo, magna eget hendrerit condimentum,
          risus nisi mollis ipsum, et malesuada diam eros non metus. Praesent id
          ligula ullamcorper, vulputate felis sed, feugiat nulla. Quisque
          commodo rhoncus massa sed imperdiet. Etiam rhoncus porttitor felis, ut
          porta nibh auctor quis. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Donec eget mattis turpis.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec ipsum
          at nunc tempus bibendum. Etiam feugiat arcu eget eros vulputate, ac
          euismod mi dignissim. Ut commodo, magna eget hendrerit condimentum,
          risus nisi mollis ipsum, et malesuada diam eros non metus. Praesent id
          ligula ullamcorper, vulputate felis sed, feugiat nulla. Quisque
          commodo rhoncus massa sed imperdiet. Etiam rhoncus porttitor felis, ut
          porta nibh auctor quis. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Donec eget mattis turpis.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec ipsum
          at nunc tempus bibendum. Etiam feugiat arcu eget eros vulputate, ac
          euismod mi dignissim. Ut commodo, magna eget hendrerit condimentum,
          risus nisi mollis ipsum, et malesuada diam eros non metus. Praesent id
          ligula ullamcorper, vulputate felis sed, feugiat nulla. Quisque
          commodo rhoncus massa sed imperdiet. Etiam rhoncus porttitor felis, ut
          porta nibh auctor quis. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Donec eget mattis turpis.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec ipsum
          at nunc tempus bibendum. Etiam feugiat arcu eget eros vulputate, ac
          euismod mi dignissim. Ut commodo, magna eget hendrerit condimentum,
          risus nisi mollis ipsum, et malesuada diam eros non metus. Praesent id
          ligula ullamcorper, vulputate felis sed, feugiat nulla. Quisque
          commodo rhoncus massa sed imperdiet. Etiam rhoncus porttitor felis, ut
          porta nibh auctor quis. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Donec eget mattis turpis.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec ipsum
          at nunc tempus bibendum. Etiam feugiat arcu eget eros vulputate, ac
          euismod mi dignissim. Ut commodo, magna eget hendrerit condimentum,
          risus nisi mollis ipsum, et malesuada diam eros non metus. Praesent id
          ligula ullamcorper, vulputate felis sed, feugiat nulla. Quisque
          commodo rhoncus massa sed imperdiet. Etiam rhoncus porttitor felis, ut
          porta nibh auctor quis. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Donec eget mattis turpis.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec ipsum
          at nunc tempus bibendum. Etiam feugiat arcu eget eros vulputate, ac
          euismod mi dignissim. Ut commodo, magna eget hendrerit condimentum,
          risus nisi mollis ipsum, et malesuada diam eros non metus. Praesent id
          ligula ullamcorper, vulputate felis sed, feugiat nulla. Quisque
          commodo rhoncus massa sed imperdiet. Etiam rhoncus porttitor felis, ut
          porta nibh auctor quis. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Donec eget mattis turpis.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec ipsum
          at nunc tempus bibendum. Etiam feugiat arcu eget eros vulputate, ac
          euismod mi dignissim. Ut commodo, magna eget hendrerit condimentum,
          risus nisi mollis ipsum, et malesuada diam eros non metus. Praesent id
          ligula ullamcorper, vulputate felis sed, feugiat nulla. Quisque
          commodo rhoncus massa sed imperdiet. Etiam rhoncus porttitor felis, ut
          porta nibh auctor quis. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Donec eget mattis turpis.
        </p>
      </div>
      <LoadingOverlay {...args} />
    </div>
  ),
} satisfies Meta<typeof LoadingOverlay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

import { render, fireEvent } from "@testing-library/react";
import Card from "./Card";
import TEST_IMAGES from "./_testCommon.js";

// smoke test
it("renders without crashing", function() {
    let currCard = TEST_IMAGES[0];
    let currCardIdx = 0;
    let total = TEST_IMAGES.length

    render(<Card
        caption={currCard.caption}
        src={currCard.src}
        currNum={currCardIdx + 1}
        totalNum={total}
    />);
});

// snapshot test
it("matches snapshot", function() {
    let currCard = TEST_IMAGES[0];
    let currCardIdx = 0;
    let total = TEST_IMAGES.length
    
  const {asFragment} = render(
    <Card
        caption={currCard.caption}
        src={currCard.src}
        currNum={currCardIdx + 1}
        totalNum={total}
    />);
  expect(asFragment()).toMatchSnapshot();
});
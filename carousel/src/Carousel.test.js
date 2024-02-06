import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

// smoke test
it("renders without crashing", function() {
  render(<Carousel
    photos={TEST_IMAGES}
    title="images for testing"
  />);
});

// snapshot test
it("matches snapshot", function() {
const {asFragment} = render(
  <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />);
expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the right arrow", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
});

it("works when you click on the left arrow", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
  
  // move backward in the carousel
  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  fireEvent.click(leftArrow);
  
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();
});

it("hides the left arrow when on the first image of carousel", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  )

  // Left arrow gone when on first image
  expect(
    container.querySelector('.bi-arrow-left-circle')
  ).not.toBeInTheDocument()

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // Left arrow present when no longer on first image
  expect(
    container.querySelector('.bi-arrow-left-circle')
  ).toBeInTheDocument()
})

it("hides the right arrow when on the last image of the carousel", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  )

  // right arrow present when not on last image
  expect(
    container.querySelector('.bi-arrow-right-circle')
  ).toBeInTheDocument()

  
  let finalIdx = TEST_IMAGES.length
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  // move forward in the carousel until reaching last image
  for(let i=0; i < finalIdx - 1; i++){
    fireEvent.click(rightArrow);
  }

  // right arrow gone when on last image
  expect(
    container.querySelector('.bi-arrow-right-circle')
  ).not.toBeInTheDocument()
})
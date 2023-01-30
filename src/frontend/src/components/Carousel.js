export default function Carousel() {
    return (
        <>
          <div className="flex-container-row carousel">
            <div className="image aspect-ratio-2-3">
              <img src="voorstelling1" alt="voorstelling 1"></img>
              <div className="overlay"></div>
            </div>
            <div className="image aspect-ratio-2-3">
              <img src="voorstelling1" alt="voorstelling 2"></img>
              <div className="overlay"></div>
            </div>
            <div className="image aspect-ratio-2-3">
              <img src="voorstelling1" alt="voorstelling 3"></img>
              <div className="overlay"></div>
            </div>
          </div>
        </>
        );
}
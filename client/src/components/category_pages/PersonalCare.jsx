import Header from '../../Header';

export default function PersonalCare() { 
  return <div className="alcohol-drinks-page">

    {/* Header Section (Circular Icons) */}
    <Header></Header>

    {/* Banner Section */}
    <div className='alcohol-page-banner-container'>
      <h2 className="alcohol-section-title">Banner</h2>

    </div>

    {/*Products title section*/}
    <section className="alcohol-title-section">
      <div className="alcohol-title-container">
        <h2 className="alcohol-title">Los mejores licores para disfrutar con responsabilidad</h2>
      </div>
    </section>

    {/*Products grid section*/}
    <section className="alcohol-offers-section">
      <div className="alcohol-offers-container">
        <h2 className="alcohol-section-title">Grid</h2>
        <div className="offers-grid">
        </div>
      </div>
    </section>

  </div>;
}
function LandingImg({src, alt, pageChanger, link}) {
    return (
        <div className="img-container">
            <div className="img-title" onClick={() => pageChanger(link)}>{link}</div>
            <img src={src} alt={alt} onClick={() => pageChanger(link)}></img>
        </div>
    );
}

export default function LandingPage({pageChanger}) {
    return (
        <div>
            <h1 style={{textAlign: 'center'}}>Linear Systems and Signals</h1>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '3%', marginTop: '5%', marginTop: '5%'}}>
                <LandingImg src="convolution_img.png" alt="Convolution" pageChanger={pageChanger} link="Convolution"></LandingImg>
                <LandingImg src="laplace_img.png" alt="Laplace" pageChanger={pageChanger} link="Laplace"></LandingImg>
                <LandingImg src="fourier_img.png" alt="Fourier" pageChanger={pageChanger} link="Fourier"></LandingImg>
            </div>
        </div>
    );
}
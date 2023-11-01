import {Link} from "react-router-dom";

function Home() {
    return (
        <div className="container">
            <h1 className="text-center">Home</h1>
            <div className="card">
                <div className="card-header">
                    Welcome!
                </div>
                <div className="card-body">
                    <h5 className="card-title">Get started</h5>
                    <p className="card-text">You can use this web page for manage registers for people, sports, countries and schools</p>
                    <Link className="btn btn-primary" to="/Sports">Go to sports</Link>
                </div>
            </div>
        </div>
    )
}
export default Home;
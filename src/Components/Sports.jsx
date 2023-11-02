import { useState, useEffect } from "react";
import "../Styles/Sports.css";
import API_URL from "../API_URL.JS";
import { useRef } from "react";

function Sports() {
    const [data, setData] = useState([]);
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const btnCloseModal = useRef(null);

    useEffect(() => {
        const parameter = "";
        fetch(API_URL + `/Sports/GetSports?parameter=${[parameter]}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setData(data);
            })
            .catch((error) => {
                console.error("Error get the data: ", error);
            });
    }, []);

    const OpenModal = (action, item) => {
        if (action === "New") {
            document.getElementById("exampleModalLabel").innerText = action;
            setId("New");
            setName("");
        } else {
            if (action === "Modify") {
                document.getElementById("exampleModalLabel").innerText = action;
                setId(item.Id);
                setName(item.Name);
            }
        }
    }

    const ClickAction = () => {

        fetch(API_URL + `/Sports/SaveSport?Id=${id}&Name=${name}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Se ha producido un error");
                }
                return response.json();
            })
            .then((response) => {
                if(response==="Modificado"){
    
                    data.map(element=>{
                        if(element.Id===id){
                            element.Name=name;
                            setData([...data]);
                            btnCloseModal.current.click();
                        }  
                    })
                }else{
                    const newRegister = { Id: response, Name: name };
                    setData([...data, newRegister]);
                    btnCloseModal.current.click();
                }
            })
            .catch((error) => {
                console.error("Error en la solicitud: ", error);
            });


        // fetch(API_URL+"/Sports/SaveSport",{
        //     method:"POST",
        //     headers:{
        //         "Content-Type":"application/json"
        //     },
        //     body:JSON.stringify({Id: id , Name: name})
        // })
        // .then(response => response.json())
        // .then(response=>{
        //     if(response==="Modificado"){
        //         data.map(prevData=>{
        //             prevData.Id===data.Id?{...prevData, ...data}:prevData
        //         })
        //         btnCloseModal.current.click();
        //     }else{
        //         const newRegister={Id:response, Name:name};
        //         setData([...data, newRegister]);
        //         btnCloseModal.current.click();
        //     }
        // })
        // .catch(error=>{
        //     console.error("Ha ocurrido un error: ", error);
        // });
    }



    return (
        <>

            <div className="container">
                <h1 className="text-center">Sports</h1>
                <div className="searchContainer">
                    <label>Search:</label>
                    <input type="text" placeholder="..." className="form-control" />
                    <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal" onClick={() => OpenModal("New", "")}>New</button>
                </div>

                <table className="table table-hover table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Modify / Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.Id}>
                                <th scope="row">{item.Id}</th>
                                <td>{item.Name}</td>
                                <td>
                                    <button className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#myModal" onClick={() => OpenModal("Modify", item)}>Modify</button>
                                    <button className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>



            <div className="modal fade" id="myModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal Title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="modalInputsContainer">
                                <label className="col-md-2">Id:</label>
                                <input type="text" placeholder="..." className="form-control" id="inputId" value={id} readOnly />
                            </div>
                            <div className="modalInputsContainer">
                                <label className="col-md-2">Name:</label>
                                <input type="text" placeholder="..." className="form-control" id="inputName" value={name} onChange={(event) => setName(event.target.value)} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={btnCloseModal}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={ClickAction}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Sports;
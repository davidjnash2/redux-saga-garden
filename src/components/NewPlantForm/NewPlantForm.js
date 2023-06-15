import React, {useState}from 'react';
import { useDispatch } from 'react-redux';

const NewPlantForm = () => {
    const dispatch = useDispatch();
    
    //Initial state is an OBJECT, with keys id and name
    let [newPlant, setPlant] = useState({id: 4, name: ''});

    const handleNameChange = (event) => {
        console.log('event happened');
        //Similar to in redux -- we dont want to get rid of the id field when we update name
        setPlant({...newPlant, name: event.target.value})
    }

    const addNewPlant = event => {
        event.preventDefault();
        dispatch({ type: 'ADD_PLANT', payload: newPlant });
        //updates the next plant to have a new id
        setPlant({id:newPlant.id + 1, name: ''});
    }
    return (
        <div>
            <h3>This is the form</h3>
            <pre>{JSON.stringify(newPlant)}</pre>
            <form onSubmit={addNewPlant}>
                <input type='text' placeholder="NAME" value={newPlant.name} onChange={handleNameChange} />
                <input type='text' placeholder="KINGDOM" value={newPlant.kingdom} onChange={handleNameChange} />
                <input type='text' placeholder="CLADE" value={newPlant.clade} onChange={handleNameChange} />
                <input type='text' placeholder="ORDER" value={newPlant.order} onChange={handleNameChange} />
                <input type='text' placeholder="FAMILY" value={newPlant.family} onChange={handleNameChange} />
                <input type='text' placeholder="SUBFAMILY" value={newPlant.subfamily} onChange={handleNameChange} />
                <input type='text' placeholder="GENUS" value={newPlant.genus} onChange={handleNameChange} />
                
                <input type='submit' value='Add New Plant' />
            </form>
        </div>
    );
}


export default NewPlantForm;

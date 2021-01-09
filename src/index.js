import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';




class BookDashboard extends React.Component {
    state = {
        persons: [
            {
                id: 1,
                name: 'A simple book',
                description: `Lorem ipsum dolor sit amet, consectetur
                    veniam, quis nostrud`
            },
            {
    id: 2,
    name: 'A book of secrets',
    description: `Sed ut perspiciatis unde omnis iste natus
                    explicabo.`
            }
      ]
  }
createNewPerson = (person) => {
    person.id = Math.floor(Math.random() * 1000);
    this.setState({ persons: this.state.persons.concat([person]) });
}
    updatePerson = (person) => {
        const pers = this.state.persons.map(p => {
            if (p.id === person.id) {
                return Object.assign({}, person)
            } else {
                return p;
            }

        });

        this.setState({ persons: pers });

    }

deletePerson = (personId) => {
   
    this.setState({ persons: this.state.persons.filter(person => person.id !== personId) })
  
}
   render() {
        const persons = this.state.persons.map(person => (

            < EditPerson
                id={person.id}
                name={person.name}
                description={person.description}
                onDeleteClick={this.deletePerson}
                onUpdateClick={this.updatePerson}
            ></EditPerson >
        ));
   
    return (
       < main className = "d-flex justify-content-center my-4" >
            
            < div className="col-5" >
                {persons}
               < ToggleableBookForm
            onPersonCreate={this.createNewPerson }
             ></ToggleableBookForm >
           </div >
     
          </main >
    
      )
}

}



class EditPerson extends React.Component {
    
    state = {
        inEditMode: false
    };
    
    enterEditMode = () => {
        this.setState({ inEditMode: true });
        }
    
    leaveEditMode = () => {
        this.setState({ inEditMode: false });
        }
    
    handleDelete = () => {
        this.props.onDeleteClick(this.props.id);
         }
    
    handleUpdate = (person) => {
     this.leaveEditMode()
     person.id = this.props.id;
     this.props.onUpdateClick(person);
     }

    
    render() {
    
        const component = () => {
           
            if (this.state.inEditMode) {
           
                return (
                    
                    < PersonForm

                id = { this.props.id }
                name = { this.props.name }
                description = { this.props.description } 
                onCancelClick = { this.leaveEditMode }
                onFormSubmit = { this.handleUpdate }
                  />
                   
        );
        
    }
    
    return(

        <Person

        name = { this.props.name }
        description = { this.props.description }
        onEditClick = { this.enterEditMode }
        onDeleteClick = { this.handleDelete }
        />

      )

    }

return (
    < div className = "mb-3 p-4" style = {{ boxShadow: '0 0 10px #ccc' }} >
        
{ component() }

      </div >
    
    )
  }
}




class Person extends React.Component {
    
    render() {
        
        return (
            <div className="card" /* style="width: 18rem;" */>
            <div className="card-header d-flex justify-content-between">
           <span>
            <strong>Name: </strong>{this.props.name}
             </span>
              <div>
               <span onClick={this.props.onEditClick} className="mr-2"><i className="far fa-edit"></i></span>
               <span onClick={this.props.onDeleteClick}><i className="fas fa-trash"></i></span>
              </div>
             </div>
             <div className="card-body">
            <span>
            <strong>Description: </strong> {this.props.description}
            </span>
                </div>
                </div>
           );
         }
   }

class PersonForm extends React.Component {

  state = {

    name: this.props.Name || '',
    description: this.props.description || ''

  }
handleFormSubmit = (evt) => {
evt.preventDefault();
this.props.onFormSubmit({...this.state});
}

    handleNameUpdate = (evt) => {

    this.setState({name: evt.target.value});

  }

  handleDescriptionUpdate = (evt) => {

    this.setState({description: evt.target.value});

  }

  render() {

    const buttonText = this.props.id ? 'Update Person': 'Create Person';

    return (

      <form onSubmit={this.handleFormSubmit}>
       <div className="form-group">
        <label>
          Name
        </label>
       <input type="text" placeholder="Enter a Name"
         value={this.state.name} onChange={this.handleNameUpdate}
         className="form-control"
        />

        </div>

        <div className="form-group">
        <label>
            Description
       </label>

          <textarea className="form-control" placeholder="Person's Description"

            rows="2" value={this.state.description}

            onChange={this.handleDescriptionUpdate}

          >

            {this.state.description}

          </textarea>

        </div>

        <div className="form-group d-flex justify-content-between">

          <button type="submit" className="btn btn-md btn-primary">

            {buttonText}

          </button>

          <button type="button" className="btn btn-md btn-secondary" onClick={this.props.onCancelClick}>

            Cancel

          </button>

        </div>

      </form>

    )
            
              }
            
            }
            
            
            
            
            
            
class ToggleableBookForm extends React.Component {
                    state = {
                        inCreateMode: false
                    }
  handleCreateClick = () => {

                    this.setState({ inCreateMode: true });

                }
              
  leaveCreateMode = () => {

                    this.setState({ inCreateMode: false });

                }
              
  handleCancleClick = () => {

                    this.leaveCreateMode();

                }
              
  handleFormSubmit = (person) => {

                    this.leaveCreateMode();

                this.props.onPersonCreate(person);
            
              }
            
  render() {

    if (this.state.inCreateMode) {

      return (
          
        <div className="mb-3 p-4" style={{ boxShadow: '0 0 10px #ccc' }} >

                    <PersonForm

                        onFormSubmit={this.handleFormSubmit}

                        onCancelClick={this.handleCancleClick}></PersonForm>

                </div>

                )
          
              }
          
              return (
          
      <button onClick={this.handleCreateClick} className="btn btn-secondary">

                    <i className="fas fa-plus"></i>

                </button>

    );
            
              }
            
            
            }
            
            
            
            
            
            
            
ReactDOM.render(<BookDashboard />, document.getElementById('root'));
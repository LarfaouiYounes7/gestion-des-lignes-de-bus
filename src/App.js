import { useState } from "react";
import "./index.css"
function App() {
  // data 
  const data = [
    { id: "1", nom: "keywo", arrets:  [] },
    { id: "2", nom: 'Ligne2', arrets: [] },
    { id: "3", nom: 'Ligne3', arrets: [] },
    { id: "4", nom: 'Ligne4', arrets: [] },
  ]
  // handle if exist hook 
  const [exist, setExist] = useState(false)

  // hook contains the object 
  const [lignes, setLignes] = useState(data)

  // handle first input   
  const [id, setId] = useState(null)

  // handle the two inputs 


  // handle the last input 
  const [debut,setDebut] = useState(null)
  const [terminus ,setTerminus] = useState(null)
  
  // handle ligne 
  const [ligne,setLigne] = useState(null)

  // handle arretNameInput

  const [arret,setArret] = useState(0)

  const rechercher = () => 
  {
    const ligne = lignes.find(ligne => ligne.id == id)
    if (ligne) {
      setExist(true)
      setLigne(ligne)
    }
    if ( ligne.arrets.length != 0){
    setDebut(ligne.arrets[0].code)
    setTerminus(ligne.arrets[ligne.arrets.length-1].code)
    }
  }
  const UpdloadData = ()=>{
    return ( 
      <div>
        <button
         onClick={()=>{
          const ligne = lignes.find(ligne => ligne.id == id)
          if ( ligne.arrets.length != 0){
            setDebut(ligne.arrets[0].code)
            setTerminus(ligne.arrets[ligne.arrets.length-1].code)
            }
          else {
            setDebut('pas encore...')
            setTerminus('pas encore...')
          }
         }}
         style={{color:"green"}}>update data</button>
      </div>
    )
  }

  const ajouter = () => {
    if (exist) {
      const newlignes = lignes.map((ligne) => {
        if (ligne.id == id) {
          return { ...ligne, arrets: [...ligne.arrets, { code: arret, order: ligne.arrets.length == 0 ? 1 : ligne.arrets[ligne.arrets.length - 1].order + 1 }] }

        }
        else {
          return ligne
        }
      })
      setLignes(newlignes)
    }

  }

  const supprimer = (order) => {

    const newlignes = lignes.map((ligne) => {
      if (ligne.id == id) {
        return { ...ligne, arrets: ligne.arrets.filter((arret) => arret.order != order) }
      }
      else {
        return ligne
      }
    })
    setLignes(newlignes)
  }



  return (
    <div>
      <div style={{ borderRadius:"10px", width: "70%", marginRight: "auto", marginLeft: "auto", padding: "10px" }}>
        <h1>gestion des lignes de bus</h1>
        <table>
          <tbody>
            <tr>
              <th>Num Ligne</th>
              <td><input onChange={(e) => setId(e.target.value)} /></td>
              <td><button onClick={rechercher}>Rechercher</button></td>
            </tr>
            <tr>
              <th>Arret de depart</th>
              <td colSpan={2} ><input id="arret-depart" readOnly={true}
                value={debut}
              /></td>
            </tr>
            <tr>
              <th>Arret Terminus</th>
              <td colSpan={2} ><input id="arret-fin" readOnly={true}
                                      style={{width:"100%"}}
                  value={terminus}
              /></td>
            </tr>
            <tr>
              <th>Nouvel arret</th>
              <td><input onChange={(e) => setArret(e.target.value)} /></td>
              <td><button onClick={ajouter}>ajouter arret</button></td>
            </tr>
          </tbody>

        </table>
        <div>
          <table  cellSpacing={0} style={{ width: "50%", marginLeft: "auto", marginRight: "auto", marginTop: "50px" }}>
            <thead>
              <tr>
                <th>Nom de l'arret</th>
                <th>ordre de passage</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {exist && lignes.map((ligne) => {
                if (ligne.id == id) {
                  return (
                    ligne.arrets.map((arret, key) => (
                      <tr key={key}>
                        <td>
                          {arret.code ? arret.code : "not found"}
                        </td>
                        <td>
                          {arret.order}
                        </td>
                        <td>
                        <button style={{ backgroundColor: "red", borderRadius: "10px", color: "white", padding: "0.5rem", fontFamily: "sans-serif", fontSize: "bold" }}
                          onClick={() => supprimer(arret.order)}>Delete</button>
                        </td>
                       
                      </tr>
                    )
                    )
                  )

                }
              })}
            </tbody>
          </table>
        </div>
      </div>
      <center>
      {ligne ? <h1 style={{width:"50%"}}>Ligne Id : {id} <UpdloadData/></h1> : " " }
      </center>
    </div>
  );

}
export default App;

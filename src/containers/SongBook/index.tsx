import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  Header,
  Sticky,
  Segment,
  Icon,
  Button,
  Form,
} from 'semantic-ui-react';
// hasta esta linea importo materiales, librerias, etc.

// de ahora en delante voy a definir mis interfaces, las interfaces son un basicamente un modelo
// a seguir para cuando se quiera definir una variable con este tipo
// los modelos consisten en un monton de "variables". las variables se definen con un nombre y un tipo
// por ejemplo un string, number, u otra interfaz, ya vas a ver como surgen
// lo importante es saber, que por ejemplo cuando quieras instanciar una variable de tipo TimeSignature,
// SI O SI esa variable debe contenter una variable llamadar quarters que sea un numero, y otra llamada
// measure que tambien es un numero. esto es para que siempre se valide que una variable es un TimeSignature
// (instanciar es crear una instancia de una variable, ya vamos a pasar por eso en mas profundidad)
// btw, todo codigo siempre en inglish, los teclados en ingles tan hechos por programadores, use di inglish
// los comentarios van en el lenguaje de la audiencia que va a leer el codigo y lo necesita entender
interface TimeSignature {
  quarters: number;
  measure: number;
}

interface Block { // cada seccion, con su nombre, compases y signature
  label: string;
  measures: Measure[];
  // el [] significa que es un array de lo que sea que viene antes
  // en este caso, un array de Measure. el tipo measure esta definido en la linea 51, be patient, young one
  // asi podría ser string[] como en el ejemplo que vimos de los nombres, o un any[] para denotar
  // un array como aquel todo podrido que tenia numeros, string, bool o cualquier cosa
  timeSignature: TimeSignature;
}

// mapear el resultado de la operacion matematica
// de cada nota. despues los voy a usar para representar
// graficamente como ancho de la columna que muestra la nota
// el numero me sirve para calcular el porcentaje
// de ancho que deberia tener dentro del compas
enum NoteDurations {
  Whole = 4 / 4, // 1
  Half = 2 / 4, // 0.5
  Quarter = 1 / 4, // 0.25
  Eigth = 1 / 8, // 0.125
  Sixteenth = 1 / 16, // 0.0625
}

interface Note {
  pitch: string;
  // por ahora que sea string, en el futuro me gustaría dividir en G -> 7 -> maj = Gmaj7
  // pero que por ahora sea solamente un texto en el que podes poner pepito si queres
  duration: NoteDurations; // como NoteDurations es un enum, que devuelve un numero, duration es un numero
  // limitado a los que contenga NoteDurations, por eso enum, por enumerar las posibilidades
}

interface Measure {
  notes: Note[];
  timeSignature?: TimeSignature; // el ? significa opcional, porque si no quiero especificarle un signature lo hereda del Block
}

interface Song {
  name: string;
  sections: Block[];
}

interface State { // el estado interno que va a manejar el componente
  song: Song;
}

interface Props {
  history: any; // la historia de navegacion del browser
}

// todo lo de aca en adelante es para mucho mas adelante, pero esta bueno ir entendiendo los conceptos
class SongBook extends React.Component<Props, State> {
  // la clase SongBook (que extiende de la clase componente de react, pero por ahora no importa eso)
  // es un conjunto de funciones y variables, basicamente. Se les llaman metodos a las funciones de una clase
  // y propiedades a las variables
  contextRef: any;

  state = { // la diferencia de esto es que no estoy definiendo un tipo, estoy definiendo una propiedad
    // la propiedad state es una instancia del tipo State, definido en la linea 67
    // imaginate que esto es solamente la parte del medio de la pagina,
    // por ejemplo donde estan todos los "Goals" y podes ir agregando, en ese caso lo arranco con un array de Goal vacio
    // pero aca van a ir armandose los temas
    song: {
      name: 'Tu Prima En Tanga',
      sections: [],
    }, // arranca como un array vacio, el usuario lo llenara como quiera
  };

  addSong() {
    // TODO
  }

  addSectionToSong(e: any, data: any) {

    console.log(e, data);
  }

  render() {
    // el metodo render es el que devuelve el jsx que se va a imprimir en pantalla
    // jsx es una mezcla de xml (basicamente html, pero no esta restringido a las etiquetas de html)
    // con javascript, asi que puedo usar operaciones logicas y variables y react, la libreria del zuckerberga lo convierte a html
    // el html es lo que se le imprime en el navegador del usuario
    return (
      <Segment basic={true} ref={ref => { this.contextRef = ref; }}>
        <Header as="h2" textAlign="left">
          <Header.Content>
            <Icon color="teal" name="music" circular={true} />
            SongBook
            <Header.Subheader>
              A place to write the songs n shit
            </Header.Subheader>
          </Header.Content>
        </Header>
        <Sticky context={this.contextRef}>
          <Button.Group className="btnGroupResourceOptions" floated="right" vertical={true}>
            <Button onClick={this.addSong} circular={true} icon={true}>
              <Icon name="add" />
            </Button>
          </Button.Group>
        </Sticky>
        <Segment>
          <Form onSubmit={this.addSectionToSong}>
            <Form.Input
              type="text"
              name="label"
              label="Etiqueta"
            />
            <Form.Group inline={true}>
              <Form.Input
                type="number"
                name="quarters"
                label="Cuartos"
                value={4}
              />
              <Form.Input
                type="number"
                name="measure"
                label="Compas"
                value={4}
              />
            </Form.Group>
            <Form.Button
              type="submit"
              icon={true}
              circular={true}
            >
              <Icon name="save" />
            </Form.Button>
          </Form>
        </Segment>
      </Segment>
    );
  }
}
const mapStateToProps = state => ({ // funciones para mapear el estado de la aplicacion
});
const mapDispatchToProps = dispatch => ({ // funciones para mapear acciones de la aplicacion (dispatch an action to the application state)
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SongBook));
// la funcion withRouter devuelve el componente que se le pase con router de navegacion del browser
// para accesar al historial de la sesion y navegar a http://lmgtfy.com/?q=tu+prima+en+tanga
// la funcion connect conecta el componente que se le pase con las acciones y estado de la aplicacion entera
// en este caso withRouter devuelve el componente SongBook con acciones y el estado de la app, conectado a la navegacion

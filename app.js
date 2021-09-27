const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/test')
    .then( () => console.log('Conectado a MongoDB'))
    .catch( error => console.log(error));

const cursoSchema =  new Schema({
    nombre: String,
    autor: String,
    etiquetas: [String],
    fecha: {type: Date, default: Date.now},
    publicado: Boolean
});

const Curso = mongoose.model('Curso', cursoSchema);

const crearCurso = async () => {
    const curso = new Curso({
        nombre: 'Node.JS',
        autor: 'Seiji',
        etiquetas: ['js', 'frontend'],
        publicado: true
    });
    
    const resultado = await curso.save();
    console.log(resultado);
}

//crearCurso();

const listarCursos = async () => {
    const cursos = await Curso
        .find({publicado: true})
        .limit(10)
        .sort({nombre: 1})
        .select({nombre: 1, autor: 1, etiquetas: 1});

    console.log(cursos);
}

//listarCursos();

const actualizarCurso = async id => {
    /*
    const curso = await Curso.findById(id);

    if(!curso){
        console.log('Curso no encontrado');
        return;
    }

    curso.autor = 'Seiji';

    const resultado = await curso.save();
    */
   
    const resultado = await Curso.findOneAndUpdate(id, {
        $set:{
            autor: 'Carmelo',
            publicado: true
        }
    }, {new: true});

    console.log(resultado);

}

actualizarCurso('61510cf79a4962a028b4aee7');


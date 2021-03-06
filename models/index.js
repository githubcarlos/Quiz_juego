var path = require('path');

// Cargar ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite:
//    DATABASE_URL = sqlite:///
//    DATABASE_STORAGE = quiz.sqlite

var url, storage;

if (!process.env.DATABASE_URL) {
    url = "sqlite:///";
    storage = "quiz.sqlite";
} else {
    url = process.env.DATABASE_URL;
    storage = process.env.DATABASE_STORAGE || "";
}

var sequelize = new Sequelize(url, 
	 						  { storage: storage,
				              	omitNull: true 
				              });

// Importar la definicion de la tabla Quiz de quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

// Importar la definicion de la tabla Comments de comment.js
var Comment = sequelize.import(path.join(__dirname,'comment'));

// Importar la definicion de la tabla Users de user.js
var User = sequelize.import(path.join(__dirname,'user'));

// Importar la definicion de la tabla Attachments de attachment.js
var Attachment = sequelize.import(path.join(__dirname,'attachment'));

// Relaciones entre modelos
Comment.belongsTo(Quiz, {foreignKey: 'QuizId'});
Quiz.hasMany(Comment, {foreignKey: 'QuizId'});

// Relacion 1 a N entre User y Quiz:
User.hasMany(Quiz, {foreignKey: 'AuthorId'});
Quiz.belongsTo(User, {as: 'Author', foreignKey: 'AuthorId'});

//Relacion 1 a N entre User y Comment
User.hasMany(Comment, {foreignKey: 'AuthorId'});
Comment.belongsTo(User, {as: 'Author', foreignKey: 'AuthorId'});

// Relacion 1-a-1 ente Quiz y Attachment
Attachment.belongsTo(Quiz);
Quiz.hasOne(Attachment);

/* eliminamos la sincronizacion e inicializacion ya que la realizamos con sequelize-cli
    // sequelize.sync() crea e inicializa tabla de preguntas en DB
    sequelize.sync()
        .then(function() {
            // Ya se han creado las tablas necesarias.
            return Quiz.count()
                    .then(function (c) {
                        if (c === 0) {   // la tabla se inicializa solo si está vacía
                            return Quiz.bulkCreate([
                                { question: 'Capital de Italia', answer: 'Roma' },
                                { question: 'Capital de Portugal', answer: 'Lisboa'}
                            ])
                            .then(function() {
                                console.log('Base de datos inicializada con datos');
                            });
                        }
                    });
        })
        .catch(function(error) {
            console.log("Error Sincronizando las tablas de la BBDD:", error);
            process.exit(1);
        });
*/

exports.Quiz = Quiz; // exportar definición de tabla Quiz
exports.Comment = Comment; // exportar definición de tabla Comments
exports.User = User; // exportar definición de tabla Users
exports.Attachment = Attachment; // exportar definición de tabla Attachments
const tf = require('@tensorflow/tfjs');

class AI{
    // for compile the actual model , before using it 
    compile (){
        const model = tf.sequential();
        // input layer 
        model.add(tf.layers.dense({units: 3, inputShape: [3]}));
        // hidden layer
        // model.add(tf.layers.dense({units: 10, activation:'relu'}));
        // output layer
        model.add(tf.layers.dense({units: 2}));
        model.compile({
            loss: 'meanSquaredError',
            optimizer:'sgd',//stat gradient descent
        });
        return model;
    }
    // run the model 
    run(){
        const model = this.compile();
        // xs is the input layer 
        const xs = tf.tensor2d([
            [0.1, 0.2, 0.5], 
            [0.9, 0.4, 0.7],
            [0.6 ,0.4, 0.7]]);
        // ys is the output layer
        const ys = tf.tensor2d([[1, 0],[ 0, 1], [0.1, 1] ]);
        // train the model
        model.fit(xs, ys, {
            // traning for how many times 
            epochs: 100,
            // batchSize: 10,
            // shuffle: true,
        }).then(() => {
            const data = tf.tensor2d([
                [0.1,1.0,1.5]
            ])
            const prediction = model.predict(data);
            prediction.print();
        });
    }
}

const ai = new AI();
ai.run();
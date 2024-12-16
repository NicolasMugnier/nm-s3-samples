import { Handler, Context, S3Event } from 'aws-lambda';
import { Engine, PollyClient, StartSpeechSynthesisTaskCommand, StartSpeechSynthesisTaskCommandInput } from '@aws-sdk/client-polly';
import { GetObjectCommandOutput, S3 } from '@aws-sdk/client-s3'; 

async function streamToString (stream): Promise<string> {
    return await new Promise((resolve, reject) => {
      const chunks: Uint8Array[] = [];
      stream.on('data', (chunk) => chunks.push(chunk));
      stream.on('error', reject);
      stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
    });
}

export const handler: Handler = async (event: S3Event, context: Context, callback): Promise<void> => {
    
    try {
        
        const region = 'eu-west-1';

        console.log(event.Records);

        const record = event.Records[0];

        const s3 = new S3({'region': region});
        const object: GetObjectCommandOutput = await s3.getObject(
            {
                Bucket: record.s3.bucket.name,
                Key: record.s3.object.key
            }
        );

        const pollyClient = new PollyClient(region);
        const params: StartSpeechSynthesisTaskCommandInput = {
            Engine: Engine.STANDARD,
            OutputFormat: "mp3",
            OutputS3BucketName: "nm-sample-events-polly",
            Text: await streamToString(object.Body),
            TextType: "text",
            VoiceId: "Joanna",
            SampleRate: "22050",
        };
        await pollyClient.send(new StartSpeechSynthesisTaskCommand(params));
        console.log("Success, audio file added to " + params.OutputS3BucketName)
        
    } catch (e) {
        
        console.log("Error putting object", e);

    } 
};

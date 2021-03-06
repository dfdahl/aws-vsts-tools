/*
  Copyright 2017-2018 Amazon.com, Inc. and its affiliates. All Rights Reserved.
  *
  * Licensed under the MIT License. See the LICENSE accompanying this file
  * for the specific language governing permissions and limitations under
  * the License.
  */

import tl = require('vsts-task-lib/task');
import { AWSTaskParametersBase } from 'sdkutils/awsTaskParametersBase';

export class TaskParameters extends AWSTaskParametersBase {

    public static readonly imageNameSource: string = 'imagename';
    public static readonly imageIdSource: string = 'imageid';

    public imageSource: string;
    public sourceImageName: string;
    public sourceImageTag: string;
    public sourceImageId: string;
    public repositoryName: string;
    public pushTag: string;
    public autoCreateRepository: boolean;
    public outputVariable: string;

    constructor() {
        super();
        try {
            this.imageSource = tl.getInput('imageSource', true);
            if (this.imageSource === TaskParameters.imageNameSource) {
                this.sourceImageName = tl.getInput('sourceImageName', true);
                this.sourceImageTag = tl.getInput('sourceImageTag', false);
                if (!this.sourceImageTag) {
                    this.sourceImageTag = 'latest';
                }
            } else {
                this.sourceImageId = tl.getInput('sourceImageId', true);
            }

            this.repositoryName = tl.getInput('repositoryName', true);
            this.pushTag = tl.getInput('pushTag', false);
            this.autoCreateRepository = tl.getBoolInput('autoCreateRepository', false);
            this.outputVariable = tl.getInput('outputVariable', false);
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

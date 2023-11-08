import { Schema, models, model } from "mongoose";

export const DatabaseSchema = new Schema(
  {
    kind: {
      type: String,
      default: "Otro"
    },
    botany: {
      seedsPerGram: {
        type: String,
        default: 1
      },
      family: {
        type: String,
        default: "Otro"
      },
      specificCharacteristics: {
        type: String,
      }
    },
    gardenDesign: {
      gardenLocation: {
        type: String,
      },
      plantsDistance: {
        type: String
      },
      asociateWith: {
        type: String
      },
      rotateWith: {
        type: String
      },
      spaceNeeded:{
        type: String
      },
      shadowTolerance:{
        type: Boolean
      },
      bowlCultivation:{
        type: Boolean
      }
    },
    cultivationWork:{
      specialTasks:{
        type: String
      },
      difficulty:{
        type: String
      }
    },
    planning:{
      sowingSeason:{
        type: String
      },
      stagingRecomendation: {
        type: String
      },
      greenFertilizer: {
        type: String
      },
    },
    productHarvest:{
      harvestPerformance:{
        type: String
      },
      possibleHarvest:{
        type: String
      },
      recommendedHarvest:{
        type: String
      }
    },
    seedsHarvest:{
      germinativeYears:{
        type: String
      },
      kindOfFertilization:{
        type: String
      },
      howToHarvest:{
        type: String
      }
    }
  },
  {
    timestamps: true,
  }
);

const Database = models.Database || model("Database", DatabaseSchema);

export default Database

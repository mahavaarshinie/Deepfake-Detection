import torch
import os

MODEL_WEIGHTS_PATH = r"C:\Users\USER\Desktop\DeepfakeDetector\weights\dsrxnet_v3_vit_killer.pth"

print("\n--- 🔍 DSRxNet WEIGHTS PARSER PASS ---")

if os.path.exists(MODEL_WEIGHTS_PATH):
    try:
        state_dict = torch.load(MODEL_WEIGHTS_PATH, map_location="cpu")
        all_keys = list(state_dict.keys())
        print(f"✅ Weights file loaded successfully!")
        print(f"📦 Total weight keys found: {len(all_keys)}")
        
        print("\n📋 CLASSIFIER LAYER NAMES FOUND IN YOUR PTH FILE:")
        # Look specifically for your classifier layers at the end of the state dict
        classifier_keys = [k for k in all_keys if "classifier" in k]
        
        if classifier_keys:
            for key in classifier_keys:
                print(f" -> {key} (Shape: {list(state_dict[key].shape)})")
                
            # Grab the final bias layer dynamically to print the raw index weights
            final_bias_key = classifier_keys[-1]
            if "bias" in final_bias_key:
                bias_vals = state_dict[final_bias_key].numpy()
                print(f"\n🎯 True Final Bias Layer Array values ({final_bias_key}): {bias_vals}")
        else:
            print("⚠️ No keys found matching the word 'classifier'. Printing last 10 raw keys instead:")
            for key in all_keys[-10:]:
                print(f" -> {key}")
                
    except Exception as e:
        print(f"❌ Failed to parse model file: {str(e)}")
else:
    print(f"❌ Cannot locate file at target path: {MODEL_WEIGHTS_PATH}")

print("---------------------------------------\n")
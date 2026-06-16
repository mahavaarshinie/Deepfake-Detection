import torch
import torch.nn as nn
import torchvision.models as models
import timm

class DSRXNetV3(nn.Module):
    def __init__(self):
        super().__init__()

        # 1. ResNet50 (Matching your exact fine-tuning structure)
        self.resnet = models.resnet50(pretrained=False) # Loaded via state_dict on startup
        self.resnet.fc = nn.Identity()

        # 2. Xception Backbone (Via timm)
        self.xception = timm.create_model(
            "xception",
            pretrained=False,
            num_classes=0,
            global_pool="avg"
        )

        # 3. True Classifier Architecture (Exact layer shapes)
        self.classifier = nn.Sequential(
            nn.Linear(4096, 1024),
            nn.BatchNorm1d(1024),
            nn.SiLU(),
            nn.Dropout(0.5),

            nn.Linear(1024, 512),
            nn.BatchNorm1d(512),
            nn.SiLU(),
            nn.Dropout(0.4),

            nn.Linear(512, 2)
        )

    def forward(self, x):
        f1 = self.resnet(x)
        f2 = self.xception(x)

        fused = torch.cat([f1, f2], dim=1)
        return self.classifier(fused)
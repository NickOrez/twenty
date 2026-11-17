import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WorkspaceIteratorModule } from 'src/database/commands/command-runners/workspace-iterator.module';
import { PointAccountsCommandMenuItemsToAppPreferencesCommand } from 'src/database/commands/upgrade-version-command/2-60/2-60-workspace-command-1794826956977-point-accounts-command-menu-items-to-app-preferences.command';
import { DropWorkspaceWorkflowVersionObjectCommand } from 'src/database/commands/upgrade-version-command/2-60/2-60-workspace-command-1794913859925-drop-workspace-workflow-version-object.command';
import { RepairSkippedStandardCommandMenuItemsCommand } from 'src/database/commands/upgrade-version-command/2-60/2-60-workspace-command-1794935266664-repair-skipped-standard-command-menu-items.command';
import { ApplicationModule } from 'src/engine/core-modules/application/application.module';
import { CommandMenuItemEntity } from 'src/engine/metadata-modules/command-menu-item/entities/command-menu-item.entity';
import { WorkspaceCacheModule } from 'src/engine/workspace-cache/workspace-cache.module';
import { WorkspaceMigrationRunnerModule } from 'src/engine/workspace-manager/workspace-migration/workspace-migration-runner/workspace-migration-runner.module';
import { WorkspaceMigrationModule } from 'src/engine/workspace-manager/workspace-migration/workspace-migration.module';

@Module({
  imports: [
    ApplicationModule,
    TypeOrmModule.forFeature([CommandMenuItemEntity]),
    WorkspaceCacheModule,
    WorkspaceIteratorModule,
    WorkspaceMigrationModule,
    WorkspaceMigrationRunnerModule,
  ],
  providers: [
    PointAccountsCommandMenuItemsToAppPreferencesCommand,
    DropWorkspaceWorkflowVersionObjectCommand,
    RepairSkippedStandardCommandMenuItemsCommand,
  ],
})
export class V2_60_UpgradeVersionCommandModule {}

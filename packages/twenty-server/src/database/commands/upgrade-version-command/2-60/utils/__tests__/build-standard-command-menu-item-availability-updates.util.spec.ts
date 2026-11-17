import { TWENTY_STANDARD_APPLICATION_UNIVERSAL_IDENTIFIER } from 'twenty-shared/application';

import { buildStandardCommandMenuItemAvailabilityUpdates } from 'src/database/commands/upgrade-version-command/2-60/utils/build-standard-command-menu-item-availability-updates.util';
import { type FlatCommandMenuItem } from 'src/engine/metadata-modules/flat-command-menu-item/types/flat-command-menu-item.type';
import { STANDARD_COMMAND_MENU_ITEMS } from 'src/engine/workspace-manager/twenty-standard-application/constants/standard-command-menu-item.constant';

const NOW = '2026-11-17T12:00:00.000Z';
const CREATED_AT = '2026-01-01T00:00:00.000Z';

const DEFINITION = STANDARD_COMMAND_MENU_ITEMS.navigateToNextRecord;

const STALE_EXPRESSION = 'pageType == "RECORD_PAGE" and not isInSidePanel';

const buildCommandMenuItem = (
  commandMenuItem: Partial<FlatCommandMenuItem>,
): FlatCommandMenuItem =>
  ({
    id: '20202020-0000-4000-8000-0000000000c1',
    universalIdentifier: DEFINITION.universalIdentifier,
    applicationUniversalIdentifier:
      TWENTY_STANDARD_APPLICATION_UNIVERSAL_IDENTIFIER,
    conditionalAvailabilityExpression: STALE_EXPRESSION,
    isPinned: true,
    position: 3.125,
    updatedAt: CREATED_AT,
    ...commandMenuItem,
  }) as FlatCommandMenuItem;

const buildUpdates = (commandMenuItems: FlatCommandMenuItem[]) =>
  buildStandardCommandMenuItemAvailabilityUpdates({
    flatCommandMenuItemMaps: {
      byUniversalIdentifier: Object.fromEntries(
        commandMenuItems.map((commandMenuItem) => [
          commandMenuItem.universalIdentifier,
          commandMenuItem,
        ]),
      ),
    },
    now: NOW,
  });

describe('buildStandardCommandMenuItemAvailabilityUpdates', () => {
  it('writes the standard expression on a command holding a stale one, leaving the rest', () => {
    const commandMenuItem = buildCommandMenuItem({});

    expect(buildUpdates([commandMenuItem])).toEqual([
      {
        ...commandMenuItem,
        conditionalAvailabilityExpression:
          DEFINITION.conditionalAvailabilityExpression,
        updatedAt: NOW,
      },
    ]);
  });

  it('leaves a command already holding the standard expression', () => {
    expect(
      buildUpdates([
        buildCommandMenuItem({
          conditionalAvailabilityExpression:
            DEFINITION.conditionalAvailabilityExpression,
        }),
      ]),
    ).toEqual([]);
  });

  it('leaves a command another application holds on the same identifier', () => {
    expect(
      buildUpdates([
        buildCommandMenuItem({
          applicationUniversalIdentifier:
            '20202020-0000-4000-8000-0000000000ae',
        }),
      ]),
    ).toEqual([]);
  });

  it('leaves a command that is not part of the standard application', () => {
    expect(
      buildUpdates([
        buildCommandMenuItem({
          universalIdentifier: '20202020-0000-4000-8000-0000000000c9',
        }),
      ]),
    ).toEqual([]);
  });
});

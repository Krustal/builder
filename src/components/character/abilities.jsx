import React from 'react';
import CharacterAbilityStyles from '../../styles/components/character_abilities.scss';

export default class CharacterAbilities extends React.Component {
  render() {
    return (
      <div className={CharacterAbilityStyles.characterAbilities}>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>str</th>
              <th>con</th>
              <th>dex</th>
              <th>int</th>
              <th>wis</th>
              <th>cha</th>
            </tr>
          </thead>
          <tbody>
            <tr className="editable">
              <th></th>
              <td>
                <input
                className="ability"
                type="text"
                min={0}
                max={40} />
              </td>
              <td>
                <input
                className="ability"
                type="text"
                min={0}
                max={40} />
              </td>
              <td>
                <input
                className="ability"
                type="text"
                min={0}
                max={40} />
              </td>
              <td>
                <input
                className="ability"
                type="text"
                min={0}
                max={40} />
              </td>
              <td>
                <input
                className="ability"
                type="text"
                min={0}
                max={40} />
              </td>
              <td>
                <input
                className="ability"
                type="text"
                min={0}
                max={40} />
              </td>
            </tr>
            <tr className="computed">
              <th>
                <div>modifier</div>
              </th>
              <td>
                <input className="ability" type="text" />
              </td>
              <td>
                <input className="ability" type="text" />
              </td>
              <td>
                <input className="ability" type="text" />
              </td>
              <td>
                <input className="ability" type="text" />
              </td>
              <td>
                <input className="ability" type="text" />
              </td>
              <td>
                <input className="ability" type="text" />
              </td>
            </tr>
            <tr className="computed output">
              <th>
                <div>
                modifier + level
                </div>
              </th>
              <td>
                <input className="ability" type="text" />
              </td>
              <td>
                <input className="ability" type="text" />
              </td>
              <td>
                <input className="ability" type="text" />
              </td>
              <td>
                <input className="ability" type="text" />
              </td>
              <td>
                <input className="ability" type="text" />
              </td>
              <td>
                <input className="ability" type="text" />
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3} />
              <td className="tab">initiative</td>
              <td colSpan={3} />
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
}

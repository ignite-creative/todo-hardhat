import '@nomiclabs/hardhat-waffle';
import { task } from 'hardhat/config';
import { HardhatRuntimeEnvironment } from 'hardhat/types';

task('deploy', 'Deploy Task contract').setAction(
  async (_, hre: HardhatRuntimeEnvironment): Promise<void> => {
    const Task = await hre.ethers.getContractFactory('TaskContract');
    const task = await Task.deploy();
    await task.deployed();

    console.log('TaskContract deployed to:', task.address);
  }
);
